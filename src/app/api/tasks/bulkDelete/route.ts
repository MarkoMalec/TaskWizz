import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
    try {
      const { taskIds } = await req.json();
  
      const taskIdsArray = Object.values(taskIds);
  
      // First delete associated TaskAssignment records
      await prisma.taskAssignment.deleteMany({
        where: {
          taskId: {
            in: taskIds,
          },
        },
      });
  
      // Now delete the tasks
      const task = await prisma.task.deleteMany({
        where: {
          id: {
            in: taskIds,
          },
        },
      });
  
      return NextResponse.json({
        status: 200,
        json: { task, message: "Tasks deleted successfully!" },
      });
    } catch (error) {
      console.error(`Failed to delete tasks: ${error}`);
  
      return NextResponse.json({
        status: 500,
        json: { message: "Internal server error" },
      });
    }
  }
  