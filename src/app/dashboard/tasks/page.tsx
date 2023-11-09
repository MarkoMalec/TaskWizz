import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { prisma } from "~/lib/prisma";
import TasksTable from "~/components/Tasks/Table/TasksTable";

const TasksPage = async () => {
  const session = await getServerSession(authOptions);

  const assignments = await prisma.taskAssignment.findMany({
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

  return <TasksTable admin={false} tasks={taskAssignments} />;
};

export default TasksPage;
