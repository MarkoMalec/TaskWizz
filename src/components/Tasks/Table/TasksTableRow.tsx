import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import format from "date-fns/format";
import { usePriorityStyle } from "~/lib/hooks/usePriorityStyle";
import { useTaskStatusStyle } from "~/lib/hooks/useTaskStatusStyle";
import { TableCell, TableRow } from "~/components/ui/table";
import { toast } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "../../ui/button";

import Link from "next/link";
import DeleteTaskDialog from "../DeleteTaskDialog";
import TaskStatusChange from "../TaskStatusChange";

type UsersTableRowProps = {
  admin?: boolean;
  task: any;
  onCheck: (taskId: string) => void;
  onUncheck: (taskId: string) => void;
  isSelected: boolean;
};

const TasksTableRow = ({
  admin,
  task,
  onCheck,
  onUncheck,
  isSelected,
}: UsersTableRowProps) => {
  console.log(task.status);
  const checkboxRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { priorityStyle } = usePriorityStyle(task.priority);
  const { taskStatusStyle } = useTaskStatusStyle(task.status);

  const simulateCheckboxClick = () => {
    const checkbox = checkboxRef.current;
    if (checkbox) {
      checkbox.click();
    }
  };

  const deadlineDate = new Date(task.deadline);
  const formattedDeadlineDate = format(deadlineDate, "dd-MM-Y");

  return (
    <TableRow key={task.id} className={`${isSelected ? "bg-muted" : null}`}>
      <TableCell onClick={simulateCheckboxClick}>
        <Checkbox
          ref={checkboxRef}
          checked={isSelected}
          onCheckedChange={(selectedTasks) =>
            selectedTasks ? onCheck(task.id) : onUncheck(task.id)
          }
        />
      </TableCell>
      <TableCell className="font-medium">
        <span className={`${priorityStyle}`} />
        {task.priority}
      </TableCell>
      <TableCell>
        <Link href={`/admin/tasks/${task.id}`}>{task.name}</Link>
      </TableCell>
      <TableCell>{task.city}</TableCell>
      <TableCell>{formattedDeadlineDate}</TableCell>
      <TableCell>
        <span className={taskStatusStyle}>{task.status}</span>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              asChild
              variant="ghost"
              className="h-8 w-8 cursor-pointer p-0"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(
                  `localhost:3000${pathname}/${task.id}`,
                );
                toast.success("Task URL copied!");
              }}
              className="cursor-pointer"
            >
              Copy task link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link prefetch={false} href={`/admin/tasks/${task.id}`}>
                View task
              </Link>
            </DropdownMenuItem>
            <div className="mt-3 flex flex-col justify-stretch gap-1">
              {admin ? null : <TaskStatusChange taskId={task.id} status={task.status} />}
              {admin ? <DeleteTaskDialog taskId={task.id} /> : null}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default TasksTableRow;
