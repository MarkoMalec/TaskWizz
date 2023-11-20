import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "~/lib/prisma";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
};

// export async function PATCH(req: NextRequest): Promise<NextResponse> {
//   try {
//     const { id, name, password, email, profile, fileUrl } = await req.json(); // Extract profile
//     const hashedPassword = crypto
//     .createHash("sha256")
//     .update(password)
//     .digest("hex");

//     const user = await prisma.user.update({
//       where: {
//         id: id,
//       },
//       data: {
//         name: name,
//         email: email,
//         password: hashedPassword,
//         image: fileUrl,
//         profile: {
//           update: { ...profile },
//         },
//       },
//       include: {
//         profile: true,
//       },
//     });
//     return NextResponse.json({
//       status: 200,
//       json: { user, message: `User updated successfully!` },
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({
//       status: 500,
//       json: { message: "Internal server error" },
//     });
//   }
// }

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const { id, name, password, email, profile, fileUrl } = await req.json();

    const dataToUpdate = {
      name,
      email,
      password,
      image: fileUrl,
      profile: profile ? { update: { ...profile } } : undefined,
    };

    // Only hash and update the password if it's provided
    if (password) {
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

    return NextResponse.json({ status: 200, json: { user, message: "User updated successfully!" } });
  } catch (error) {
    console.error("Error in PATCH /api/user/edit:", error); // More detailed error
    return NextResponse.json({ status: 500, json: { message: "Internal server error" } });
  }
}

