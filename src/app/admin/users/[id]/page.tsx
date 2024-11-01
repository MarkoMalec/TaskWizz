import React from "react";
import { prisma } from "~/lib/prisma";
import { Metadata } from "next";
import UserProfile from "~/components/Users/Profile/UserProfile";

interface Props {
  params: {
    id: string;
    page: string;
  };
  searchParams: any;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `${user?.name}` };
}

export default async function UserProfilePage({ params, searchParams }: Props) {
  const defaultPageSize = 8;

  const totalTasks = await prisma.taskAssignment.count({
    where: { userId: params.id },
  });

  const perPage = Math.min(
    Math.max(parseInt(searchParams?.per_page as string) || defaultPageSize, 1),
    100,
  );

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      profile: true,
      tasks: true,
    },
  });

  const totalAssignments = await prisma.taskAssignment.count({
    where: { userId: params.id },
  });
  const totalPages = Math.ceil(totalAssignments / perPage);

  let page = parseInt(searchParams?.page as string) || 1;
  page = Math.max(1, Math.min(page, totalPages));

  const assignments = await prisma.taskAssignment.findMany({
    where: {
      userId: params.id,
    },
    include: {
      task: {
        select: {
          id: true,
          name: true,
          status: true,
          priority: true,
          deadline: true,
          address: true,
          city: true,
          postcode: true,
        },
      },
    },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const taskAssignments = assignments.map((assignment) => assignment.task);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return (
    <UserProfile
      user={user}
      taskAssignments={taskAssignments}
      page={page}
      pageNumber={page}
      perPage={perPage}
      totalPages={totalPages}
      totalTasks={totalTasks}
      hasPrevPage={hasPrevPage}
      hasNextPage={hasNextPage}
    />
  );
}
