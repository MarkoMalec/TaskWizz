import crypto from "crypto";
import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, password, profession, hasTransport } =
      await req.json();

    // Hashing the password with SHA-256
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword, // Storing the hashed password
        profile: {
          create: {
            function: 'Worker',
            profession: profession,
            hasTransport: hasTransport,
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      json: { user: newUser, message: "User created successfully!" },
    });
  } catch (error) {
    handlePrismaError(error);

    return NextResponse.json({
      status: 500,
      json: { message: "Internal server error" },
    });
  }
}
