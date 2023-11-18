"use client";

import React, { useState } from "react";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import getInitials from "~/lib/getInitials";
import { usePriorityStyle } from "~/lib/hooks/usePriorityStyle";
import { format, formatDistance, subDays } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";
import { EditableInputField } from "./EditTaskFields/EditableFields";

const Task = ({ task }: any) => {
  const { isMutating, doFetch } = useMutatingFetch();
  const { priorityStyle } = usePriorityStyle(task.priority);
  const [theTask, setTheTask] = useState(task);

  const dateCreated = new Date(task.dateCreated);
  const formattedDate = format(dateCreated, "dd.MM.yyyy");
  const ago = formatDistance(subDays(dateCreated, 0), new Date(), {
    addSuffix: true,
  });

  const deadlineDate = new Date(task.deadline);
  const formattedDeadlineDate = format(deadlineDate, "dd.MM.yyyy");

  const handleSave = (name: string, value: string) => {
    setTheTask((prev: object) => ({ ...prev, [name]: value }));
    const currentChanges = { [name]: value };

    saveChangeToServer(currentChanges);
  };

  const saveChangeToServer = async (updates: any) => {
    doFetch(
      "/api/task/edit",
      {
        method: "PATCH",
        body: JSON.stringify({ id: task.id, ...updates }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      () => {
        toast.success(`Field successfully edited`);
      },
    );
  };

  return (
    <div className="flex gap-5">
      <Card className="flex-1">
        <div className="flex items-center gap-3 p-5">
          <div className="flex items-center gap-1">
            <CalendarDays />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock />
            <span>{ago}</span>
          </div>
        </div>
        <CardHeader className="pt-0">
          <CardTitle className="antialised mb-2 pt-0 text-5xl font-extrabold tracking-tight">
            {task?.name}
          </CardTitle>
          <CardDescription>
            {" "}
            <span className={priorityStyle} />
            {task.priority}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-bold">Description</h3>
          <EditableInputField
            initialValue={theTask.description}
            name="description"
            onSave={handleSave}
            isMutating={isMutating}
            type="textarea"
          />
          {formattedDeadlineDate}
        </CardContent>
      </Card>
      <Card className="flex-none">
        <CardHeader>
          <CardTitle>
            <span className="text-3xl font-extrabold">Assignees</span>
          </CardTitle>
          <CardDescription>Users currently working on task</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex">
            {task?.assignedTo.map((task: any, index: number) => {
              const initials = getInitials(task.user.name);

              return (
                <TooltipProvider key={task.user.id} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        key={task.user.id}
                        className={`-ml-3 block z-${index++}`}
                        href={`/admin/users/${task.user.id}`}
                      >
                        <Avatar className="h-[52px] w-[52px] border-2 border-black">
                          <AvatarImage src={task.user.image} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{task.user.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Task;
