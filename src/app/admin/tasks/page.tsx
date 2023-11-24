import React from "react";
import { prisma } from "~/lib/prisma";
import TasksTable from "~/components/Tasks/Table/TasksTable";
import AddTaskDialog from "~/components/Tasks/AddTaskDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { CalendarSearch } from "lucide-react";

export const metadata = {
  title: "Tasks",
};

const TasksPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined | any };
}) => {
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

  const totalTasks = await prisma.task.count({ where: whereClause });
  const totalPages = Math.ceil(totalTasks / perPage);

  let page = parseInt(searchParams?.page as string) || 1;
  page = Math.max(1, Math.min(page, totalPages));

  const tasks = await prisma.task.findMany({
    where: whereClause,
    orderBy: { dateCreated: "desc" },
    skip: (page - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      name: true,
      priority: true,
      status: true,
      deadline: true,
      address: true,
      city: true,
    },
    
  });

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;


  if (!tasks) {
    return <>Loading</>
  }


  return (
    <>
      <div className="flex items-center justify-between">
        <form method="get" action="/admin/tasks" className="flex items-center">
          <Input
            type="text"
            name="search"
            placeholder="Search tasks..."
            defaultValue={searchQuery}
          />
          <Button className="-ml-[58px]" type="submit">
            <CalendarSearch />
          </Button>
        </form>
        <AddTaskDialog user={session?.user} />
      </div>
      <TasksTable
        admin={true}
        tasks={tasks}
        totalTasks={totalTasks}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </>
  );
};

export default TasksPage;
