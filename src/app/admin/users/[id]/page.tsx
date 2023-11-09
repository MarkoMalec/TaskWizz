import React from "react";
import { prisma } from "~/lib/prisma";
import { Metadata } from "next";
import UserProfile from "~/components/Users/Profile/UserProfile";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `${user?.name}` };
}

export default async function UserProfilePage({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      profile: true,
      tasks: true,
    },
  });

  const assignments = await prisma.taskAssignment.findMany({
    where: {
      userId: params.id,
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

  console.table(taskAssignments);

  return <UserProfile user={user} taskAssignments={taskAssignments} />;
}
