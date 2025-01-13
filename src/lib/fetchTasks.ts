"use server";

import { prisma } from "~/lib/prisma";

export async function fetchTasks() {
  return await prisma.task.findMany({
    include: {
      assignedTo: true,
    },
  });
}
