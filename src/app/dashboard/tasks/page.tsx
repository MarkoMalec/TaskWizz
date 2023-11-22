import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { prisma } from "~/lib/prisma";
import TasksTable from "~/components/Tasks/Table/TasksTable";

const TasksPage = async ({ searchParams }: any) => {
  const session = await getServerSession(authOptions);
  const defaultPageSize = 8;

  const searchQuery = searchParams?.search || "";

  // Update Prisma query to include search logic
  const whereClause = searchQuery
    ? {
        OR: [{ name: { contains: searchQuery } }],
      }
    : {};

  const perPage = Math.min(
    Math.max(parseInt(searchParams?.per_page as string) || defaultPageSize, 1),
    100,
  );

  const totalAssignments = await prisma.taskAssignment.count({
    where: { userId: session?.user.id },
  });
  const totalPages = Math.ceil(totalAssignments / perPage);

  let page = parseInt(searchParams?.page as string) || 1;
  page = Math.max(1, Math.min(page, totalPages));

  const assignments = await prisma.taskAssignment.findMany({
    // where: whereClause,
    // orderBy: { dateCreated: "desc" },
    skip: (page - 1) * perPage,
    take: perPage,
    where: {
      userId: session?.user.id,
    },
    include: {
      task: {
        select: {
          id: true,
          name: true,
          priority: true,
          deadline: true,
          address: true,
          city: true,
        },
      },
    },
  });
  const taskAssignments = assignments.map((assignment) => assignment.task);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return (
    <TasksTable
      admin={false}
      tasks={taskAssignments}
      totalTasks={totalAssignments}
      hasPrevPage={hasPrevPage}
      hasNextPage={hasNextPage}
    />
  );
};

export default TasksPage;
