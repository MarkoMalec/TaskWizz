import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {

    const { id } = await params;

    const task = await prisma.task.findUnique({
        where: {
            id: id,
        }
    });

  return NextResponse.json(task);
}
