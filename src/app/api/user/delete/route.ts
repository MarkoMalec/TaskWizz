import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await req.json();

    await prisma.taskAssignment.deleteMany({
      where: {
        userId: id,
      }
    })

    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      status: 200,
      json: { user, message: "User deleted successfully!" },
    });
  } catch (error) {
    console.error(`Failed to delete user: ${error}`);

    return NextResponse.json({
      status: 500,
      json: { message: "Internal server error" },
    });
  }
}
