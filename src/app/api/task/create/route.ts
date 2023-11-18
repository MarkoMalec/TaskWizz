import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const {
      //   createdBy,
      createdById,
      name, 
      priority,
      description,
      deadline,
      address,
      city,
      assignedTo,
    } = await req.json();

    const newTask = await prisma.task.create({
      data: {
        // createdBy: createdBy,
        createdById: createdById,
        name: name,
        priority: priority,
        description: description,
        deadline: deadline,
        address: address,
        city: city,
        assignedTo: {
          createMany: {
            data: assignedTo.map((userId: any) => ({ userId })),
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      json: { user: newTask, message: "Task created successfully!" },
    });
  } catch (error) {
    handlePrismaError(error);
    return NextResponse.json({
      status: 500,
      json: { message: "Internal server error" },
    });
  }
}
