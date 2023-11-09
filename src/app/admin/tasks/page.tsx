import React from "react";
import { prisma } from "~/lib/prisma";
import TasksTable from "~/components/Tasks/Table/TasksTable";
import AddTaskDialog from "~/components/Tasks/AddTaskDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export const metadata = {
  title: "Tasks",
};

const TasksPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  const pageSize = 10;
  const totalTasks = await prisma.task.count();
  const totalPages = Math.ceil(totalTasks / pageSize);
  const page = Math.min(
    Math.max(1, parseInt(searchParams?.page as string) || 1),
    totalPages,
  );

  const tasks = await prisma.task.findMany({
    orderBy: { dateCreated: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      id: true,
      name: true,
      priority: true,
      deadline: true,
      address: true,
      city: true,
    },
  });

  return (
    <>
      <AddTaskDialog user={session?.user} />
      <TasksTable admin={true} tasks={tasks} />

      <div>
        <Button asChild>
          <Link
            href={{
              pathname: "/admin/tasks",
              query: { page: Math.max(1, page - 1) },
            }}
          >
            {"<"}
          </Link>
        </Button>
        <Button asChild>
          <Link href={{ pathname: "/admin/tasks", query: { page: page + 1 } }}>
            {">"}
          </Link>
        </Button>
      </div>
    </>
  );
};

export default TasksPage;
