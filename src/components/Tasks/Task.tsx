"use client";

import React, { useState } from "react";
import { Session, Task as TaskType } from "@prisma/client";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import toast from "react-hot-toast";
import Image from "next/image";
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
import { useTaskStatusStyle } from "~/lib/hooks/useTaskStatusStyle";
import { format, formatDistance, subDays } from "date-fns";
import { CalendarDays, Clock, PlusIcon, UploadIcon } from "lucide-react";
import {
  EditableDatepickerField,
  EditableInputField,
} from "./EditTaskFields/EditableFields";
import { Button } from "../ui/button";
import TaskStatusChange from "./TaskStatusChange";
import NoteEditor from "./Notes/NoteEditor";
import { SingleNote } from "./Notes/SingleNote";
import PdfUploader from "../uploaders/PdfUploader";

const Task = ({
  task,
  admin,
}: {
  task: TaskType | any;
  admin: true | false;
}) => {
  const { isMutating, doFetch } = useMutatingFetch();
  const [mutatingFieldName, setMutatingFieldName] = useState(""); // identifier for mutating fields
  const { priorityStyle } = usePriorityStyle(task.priority);
  const { taskStatusStyle } = useTaskStatusStyle(task.status);
  const [theTask, setTheTask] = useState(task);

  const [showNoteEditor, setShowNoteEditor] = useState(false);

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

    setMutatingFieldName(name);
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
        setMutatingFieldName("");
      },
    );
  };

  const fileUrls = task.contractFileUrl ? task.contractFileUrl.split("|||") : [];

  return (
    <div className="grid gap-5 md:grid-cols-12">
      <Card className="col-span-12 flex items-center justify-between dark:bg-[#12161c7d]">
        <CardHeader className="p-4">
          <CardTitle>
            {task.name}
            <div className="ml-4 inline-block items-center text-sm">
              <span className={priorityStyle} />
              {task.priority}{" "}
              <span className={taskStatusStyle}>{task.status}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-5 pb-0 pl-0 pt-0">
          <div>Team</div>
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
                        <Avatar className="h-[42px] w-[42px] border-[3px] border-secondary">
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
      <Card className="col-span-12 dark:bg-[#12161c7d] md:col-span-4">
        <div className="flex items-center gap-3 p-5 text-sm">
          <div className="flex items-center gap-1">
            <CalendarDays size={20} />
            <span className="text-muted-foreground">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={20} />
            <span className="text-muted-foreground">{ago}</span>
          </div>
        </div>
        <div className="border-t p-5">
          <TaskStatusChange
            taskId={task.id}
            status={task.status}
            admin={admin}
          />
        </div>
        <CardHeader className="border-b pt-0">
          <CardTitle className="antialised mb-2 flex items-center gap-2 pt-0 text-xl font-medium tracking-tight">
            Task information
          </CardTitle>
          <CardDescription className="text-xs">
            You can edit each field.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="my-2 py-2">
            <h3 className="text-md font-bold">Deadline</h3>
            <EditableDatepickerField
              initialValue={formattedDeadlineDate}
              nonFormatDate={theTask.deadline}
              name="deadline"
              onSave={handleSave}
              isMutating={isMutating && mutatingFieldName === "deadline"}
              type="datepicker"
            />
          </div>
          <div className="my-2 space-y-2 py-2">
            <h3 className="text-md font-bold">Address</h3>
            <div className="pl-2">
              <span>Street name</span>
              <EditableInputField
                initialValue={theTask.address}
                name="address"
                onSave={handleSave}
                isMutating={isMutating && mutatingFieldName === "address"}
                type="text"
              />
              <span>Postcode</span>
              <EditableInputField
                initialValue={theTask.postcode}
                name="postcode"
                onSave={handleSave}
                isMutating={isMutating && mutatingFieldName === "postcode"}
                type="text"
                className="test inline-block"
              />
              <span>City</span>
              <EditableInputField
                initialValue={theTask.city}
                name="city"
                onSave={handleSave}
                isMutating={isMutating && mutatingFieldName === "city"}
                type="text"
              />
            </div>
            <div className="my-2 py-2">
              <h3 className="text-md pb-3 font-bold">Documents</h3>
              <div className="flex gap-1">
              {fileUrls.length
                ? fileUrls.map((url: string) => (
                    <Link
                      key={url}
                      className="block w-fit"
                      href={`http://malec.ddns.net:1234${url}`}
                      target="_blank"
                    >
                      <Image
                        src={`https://image.thum.io/get/pdfSource/width/300/page/1/auth/72737-pdfthumb/http://malec.ddns.net:1234${url}`}
                        alt="pdf"
                        width={768}
                        height={520}
                        className="object-cover h-full hover:opacity-80 w-20 aspect-w-1 aspect-h-1"
                      />
                    </Link>
                  ))
                : null}
                </div>
              <PdfUploader taskId={task.id} />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="col-span-12 p-10 md:col-span-8">
        <div className="my-2 border-b py-2">
          <h3 className="text-md font-bold">Description</h3>
          <EditableInputField
            initialValue={theTask.description}
            name="description"
            onSave={handleSave}
            isMutating={isMutating && mutatingFieldName === "description"}
            type="textarea"
          />
        </div>
        {!showNoteEditor ? (
          <div className="mt-10">
            {task.TaskNote.length < 1 ? (
              <h2 className="text-center">No comments yet.</h2>
            ) : null}
            <Button
              variant="positive"
              className="mx-auto flex gap-1"
              onClick={() => setShowNoteEditor(true)}
            >
              <PlusIcon size={20} /> Add comment
            </Button>
          </div>
        ) : null}
        {showNoteEditor ? <NoteEditor taskId={task.id} /> : null}
        <div className="notes-wrapper mt-5 space-y-5">
          {task.TaskNote.reverse().map((note: any) => (
            <SingleNote key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
