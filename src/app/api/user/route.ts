import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { userId } = await req.json();
  try {
    const user = prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({
      json: user,
      message: "Successfully fetched user by id",
    });
  } catch (error) {
    handlePrismaError(error);
    return NextResponse.json({
      status: 500,
      json: { message: "Internal server error" },
    });
  }
}
