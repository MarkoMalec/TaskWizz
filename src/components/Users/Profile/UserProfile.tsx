"use client"

import React from "react";
import { User } from "~/lib/types";
import EditUserForm from "~/components/forms/EditUserForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import TasksTable from "~/components/Tasks/Table/TasksTable";

type UserProfileProps = {
  user: User | null;
  taskAssignments: any;
};

const UserProfile = ({ user, taskAssignments }: UserProfileProps) => {
  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex mt-[100px] items-center justify-center">
      <Card className="m-auto w-full max-w-[860px]">
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>View or edit the user information.</CardDescription>
        </CardHeader>
        <CardContent>
          <EditUserForm userData={user} />
        </CardContent>
        <CardHeader>
          <CardTitle>Assignments</CardTitle>
          <CardDescription>View or edit the user's tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <TasksTable totalTasks={taskAssignments.length} tasks={taskAssignments} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
