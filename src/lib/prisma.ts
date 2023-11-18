import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const handlePrismaError = (error: any) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      console.error(
        "There is a unique constraint violation, a new user cannot be created with this email",
      );
      // Here you can do additional things like send this error message to the frontend, etc.
      return "Unique constraint violation"; // Or some error object
    }
  }
  throw error;
};
