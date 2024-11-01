"use client";

import React from "react";
import { User, Task } from "@prisma/client";
import { TasksTable } from "~/components/Tasks/Table/tasks-table";
import { columns } from "~/components/Tasks/Table/tasks-table-columns";
import EditUserForm from "~/components/forms/EditUserForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import ProfilePhoto from "./ProfilePhoto";

// exclude values from TS since we are not using them in table
type PartialTask = Omit<Task, "createdById" | "dateCreated" | "description">;

type UserProfileProps = {
  user: User | null;
  taskAssignments: PartialTask[];
  page: number;
  totalTasks: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  pageNumber: number;
  perPage: number;
};

const UserProfile = ({
  user,
  taskAssignments,
  pageNumber,
  perPage,
  totalPages,
  hasPrevPage,
  hasNextPage,
}: UserProfileProps) => {
  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <div className="mt-[100px] flex items-center justify-center">
      <Card className="m-auto w-full max-w-[860px]">
        <CardHeader className="flex flex-row items-center gap-4">
          <ProfilePhoto
            userId={user.id}
            photo={user.image ? user.image : undefined}
          />
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>
              View or edit the user information.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <EditUserForm userData={user} />
        </CardContent>
        <CardHeader>
          <CardTitle>Assignments</CardTitle>
          <CardDescription>View or edit the user's tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <TasksTable
            columns={columns}
            pageNumber={pageNumber}
            perPage={perPage}
            data={taskAssignments}
            totalPages={totalPages}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            admin={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
