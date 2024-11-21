import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";


export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.error();
  }
  try {
    const { content, taskId } = await request.json();

    if (!content) {
      return NextResponse.json({ error: "Content missing" }, { status: 400 });
    }

    const newNote = await prisma.taskNote.create({
      data: {
        content: content,
        taskId: taskId,
        createdById: session.user.id,
      },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return handlePrismaError(error);
  }
}