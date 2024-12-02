import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "~/lib/prisma";

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const { id, name, email, password, profile, fileUrl } = await req.json();

    const currentUser = await prisma.user.findUnique({
      where: { id },
    });

    const dataToUpdate = {
      name,
      email,
      image: fileUrl,
      password: password,
      profile: profile ? { update: { ...profile } } : undefined,
    };

    // Check if the password has changed and update it if so
    if (password && currentUser?.password !== password) {
      dataToUpdate.password = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
    }

    const user = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
      include: { profile: true },
    });

    return NextResponse.json({
      status: 200,
      json: { user, message: "User updated successfully!" },
    });
  } catch (error) {
    console.error("Error in PATCH /api/user/edit:", error);
    return NextResponse.json({
      status: 500,
      json: { message: "Server error" },
      error,
    });
  }
}
