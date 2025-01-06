import React from "react";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "~/components/ui/select";
import { SessionContext } from "~/lib/session";

import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

type TaskStatusChangeProps = {
  admin?: boolean;
  taskId: string;
  status: string;
};

const TaskStatusChange = ({ admin, taskId, status }: TaskStatusChangeProps) => {
  const { user } = React.useContext(SessionContext);
  const { isMutating, doFetch } = useMutatingFetch();


  const updateStatusOnServer = async (status: any) => {
    doFetch(
      "/api/task/edit",
      {
        method: "PATCH",
        body: JSON.stringify({ id: taskId, status }),
        notification: {
          message: `${user.name} marked the task as ${status}`,
          type: "info",
          entityType: "task",
        },
      },
      () => {
        !admin
          ? toast.success(
              status === "In progress"
                ? "Task started. Good luck!"
                : "Task finished. Great work!",
            )
          : toast.success("Task updated successfully.");
      },
    );
  };

  if (admin) {
    return (
      <Select onValueChange={(value) => updateStatusOnServer(value)}>
        {isMutating ? (
          <div className="my-2 flex w-full justify-center">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          </div>
        ) : (
          <SelectTrigger>
            <SelectValue placeholder={status} />
          </SelectTrigger>
        )}

        <SelectContent>
          <SelectGroup>
            <SelectLabel className="test-xs">Change status</SelectLabel>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In progress">In progress</SelectItem>
            <SelectItem value="Finished">Finished</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    status !== "Finished" && (
      <AlertDialog>
        <AlertDialogTrigger asChild className="block">
          <Button>{status === "Pending" ? "Start task" : "Finish task"}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to {status === "Pending" ? "start" : "finish"} the
              task?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Make sure you double checked if this action is correct.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(update) =>
                updateStatusOnServer(
                  status === "Pending" ? "In progress" : "Finished",
                )
              }
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  );
};

export default TaskStatusChange;
