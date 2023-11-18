import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await req.json();

    await prisma.taskAssignment.deleteMany({
      where: {
        taskId: id,
      },
    });

    const task = await prisma.task.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      status: 200,
      json: { task, message: "Task deleted successfully!" },
    });
  } catch (error) {
    console.error(`Failed to delete task: ${error}`);

    return NextResponse.json({
      status: 500,
      json: { message: "Internal server error" },
    });
  }
}
