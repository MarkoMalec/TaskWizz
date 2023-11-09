import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function PATCH(req: NextRequest): Promise<NextResponse> {
    try {
        const updates = await req.json();
        console.log("updates recieved:", updates)
        const { id } = updates;
    
        // Remove non-update fields from updates object
        delete updates.id;
    
        const task = await prisma.task.update({
          where: { id: id },
          data: updates,
        });
    
        return NextResponse.json({
          status: 200,
          json: { task, message: "Task updated successfully!" },
        });
      } catch (error) {
        console.log(error);
        return NextResponse.json({
          status: 500,
          json: { message: "Internal server error" },
        });
      }
}
