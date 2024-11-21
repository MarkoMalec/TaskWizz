"use client";

import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { usePriorityStyle } from "~/lib/hooks/usePriorityStyle";
import { useTaskStatusStyle } from "~/lib/hooks/useTaskStatusStyle";
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";
import format from "date-fns/format";
import Link from "next/link";
import DeleteTaskDialog from "../DeleteTaskDialog";
import TaskStatusChange from "../TaskStatusChange";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

type Task = {
  id: string;
  priority: string | null;
  status: string;
  city: string;
  deadline: Date;
  name: string;
  address: string;
};

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      const task = row.original;

      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    filterFn: (row, id, value) => {
      return value.includes(row.getValue("priority"));
    },
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      const priorityStyle = usePriorityStyle(priority);

      return (
        <div className="flex items-center gap-1 text-sm">
          <span className={priorityStyle.priorityStyle} />
          {priority}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row, table }) => {
      const task = row.original;
      const admin = table.options.meta?.isAdmin;

      return (
        <Link
          prefetch={false}
          href={`${admin ? "/admin" : "/dashboard"}/tasks/${task.id}`}
          className="hover:underline"
        >
          {task.name}
        </Link>
      );
    },

    enableGlobalFilter: true,
    enableHiding: false,
  },
  {
    accessorKey: "city",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          City
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDeadlineDate = format(row.getValue("deadline"), "dd-MM-Y");

      return formattedDeadlineDate;
    },
  },
  {
    filterFn: (row, id, value) => {
      return value.includes(row.getValue("status") as string);
    },
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const { taskStatusStyle } = useTaskStatusStyle(status);

      return <span className={taskStatusStyle}>{status}</span>;
    },
  },
  {
    id: "Actions",
    cell: ({ table, row }) => {
      const pathname = usePathname();
      const task = row.original;
      const status = task.status;
      const admin = table.options.meta?.isAdmin;

      return (
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
              <Link prefetch={false} href={`${pathname}/${task.id}`}>
                View task
              </Link>
            </DropdownMenuItem>
            <div className="mt-3 flex flex-col justify-stretch gap-1">
              <TaskStatusChange
                admin={admin}
                taskId={task.id}
                status={status}
              />
              {admin ? <DeleteTaskDialog taskId={task.id} /> : null}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    // meta: { isAdmin },
  },
];
