import React from "react";
import Task from "~/components/Tasks/Task";
import { prisma } from "~/lib/prisma";

type Params = {
  params: {
    id: string;
    name: string;
  };
};

export async function generateMetadata({ params }: Params) {
  const task = await prisma.task.findUnique({
    where: {
      id: params.id,
    },
    select: {
      name: true,
    },
  });

  return {
    title: task?.name,
    description: "Generated by create-t3-app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  };
}

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
        <Task task={task} admin={true} />
      </div>
    )
  );
};

export default SingleTaskPage;
