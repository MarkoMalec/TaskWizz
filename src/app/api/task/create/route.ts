import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import NewTaskEmailTemplate from "~/email/templates/NewTaskEmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const {
      createdById,
      name,
      priority,
      description,
      deadline,
      address,
      postcode,
      city,
      assignedTo,
    } = await req.json();

    const newTask = await prisma.task.create({
      data: {
        createdById: createdById,
        name: name,
        priority: priority,
        description: description,
        deadline: deadline,
        address: address,
        postcode: postcode,
        city: city,
        assignedTo: {
          createMany: {
            data: assignedTo.map((userId: any) => ({ userId })),
          },
        },
      },
    });

    const mailTo = await prisma.user.findMany({
      where: {
        id: {
          in: assignedTo,
        },
      },
      select: {
        email: true,
      },
    });

    const userEmails = mailTo.map((user) => user.email) as [];

    const email = await resend.emails.send({
      from: "TaskWizz <taskwizz@markomalec.com>",
      to: userEmails,
      subject: `TaskWizz - New assignment!`,
      react: NewTaskEmailTemplate({ name, address, postcode, city, deadline }),
    });

    return NextResponse.json({
      status: 200,
      json: {
        task: newTask,
        email,
        message: `Task created successfully! ${newTask}`,
      },
    });
  } catch (error) {
    handlePrismaError(error);
    return NextResponse.json({
      status: 500,
      json: { message: "Internal server error" },
    });
  }
}
