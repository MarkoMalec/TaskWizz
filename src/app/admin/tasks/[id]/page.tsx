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
    },
  });

  return (
    <div className="py-10">
      <Task task={task} />
    </div>
  );
};

export default SingleTaskPage;
