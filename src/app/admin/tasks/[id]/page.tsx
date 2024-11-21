import React from "react";
import Task from "~/components/Tasks/Task";
import { prisma } from "~/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

type Params = {
  params: {
    id: string;
  };
};

const SingleTaskPage = async ({ params }: Params) => {
  const session = await getServerSession(authOptions);

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
      }
    },
  });

  return (
    task && (
      <div className="py-10">
        <Task task={task} admin={true} />
      </div>
    )
  );
};

export default SingleTaskPage;
