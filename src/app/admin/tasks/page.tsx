import React from "react";
import { prisma } from "~/lib/prisma";
import TasksTable from "~/components/Tasks/Table/TasksTable";
import AddTaskDialog from "~/components/Tasks/AddTaskDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import PaginationControls from "~/components/elements/PaginationControls";

export const metadata = {
  title: "Tasks",
};

const TasksPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  const defaultPageSize = 8;

  const perPage = Math.min(
    Math.max(parseInt(searchParams?.per_page as string) || defaultPageSize, 1),
    100,
  );

  const totalTasks = await prisma.task.count();
  const totalPages = Math.ceil(totalTasks / perPage);

  let page = parseInt(searchParams?.page as string) || 1;
  page = Math.max(1, Math.min(page, totalPages));

  const tasks = await prisma.task.findMany({
    orderBy: { dateCreated: "desc" },
    skip: (page - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      name: true,
      priority: true,
      deadline: true,
      address: true,
      city: true,
    },
  });

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return (
    <>
      <AddTaskDialog user={session?.user} />
      <TasksTable
        admin={true}
        tasks={tasks}
        totalTasks={totalTasks}
      />
      <PaginationControls
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        totalTasks={totalTasks}
      />
    </>
  );
};

export default TasksPage;
