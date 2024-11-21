import React from "react";
import Task from "~/components/Tasks/Task";
import { prisma } from "~/lib/prisma";

type Params = {
  params: {
    id: string;
  };
};

const SingleTaskPage = async ({ params }: Params) => {
  const task = await prisma.task.findUnique({
    where: {
      id: params.id,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      assignedTo: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      TaskNote: {
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return (
    task && (
      <div className="py-10">
        <Task task={task} admin={false} />
      </div>
    )
  );
};

export default SingleTaskPage;
