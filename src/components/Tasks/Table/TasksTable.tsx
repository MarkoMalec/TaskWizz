"use client";

import React, { useState } from "react";
import { Task } from "@prisma/client";
import useSortableTasksTableData from "~/lib/hooks/useSortableTasksTableData";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import TasksTableRow from "./TasksTableRow";
import { toast } from "react-hot-toast";
import PaginationControls from "~/components/elements/PaginationControls";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Loader2, Trash2, ArrowUpDown } from "lucide-react";

// exclude values from TS since we are not using them in table
type PartialTask = Omit<Task, 'createdById' | 'dateCreated' | 'description'>;

type TaskTableProps = {
  tasks: PartialTask[];
  admin?: true | false;
  totalTasks: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

const TasksTable = ({
  admin,
  tasks,
  totalTasks,
  hasPrevPage,
  hasNextPage,
}: TaskTableProps) => {
  const { isMutating, doFetch } = useMutatingFetch();
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const { items: sortedTasks, requestSort } = useSortableTasksTableData(tasks);

  const onCheck = (taskId: string) => {
    setSelectedTasks((prevSelectedTasks) => [...prevSelectedTasks, taskId]);
  };

  const onUncheck = (taskId: string) => {
    setSelectedTasks((prevSelectedTasks) =>
      prevSelectedTasks.filter((id) => id !== taskId),
    );
  };

  const bulkTasksDelete = async (selectedTasks: string[]) => {
    doFetch(
      "/api/tasks/bulkDelete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskIds: selectedTasks,
        }),
      },
      () => {
        toast.success("Bulk delete complete");
        setSelectedTasks([]);
      },
    );
  };

  return (
    <>
      <Table>
        <TableCaption>
          Showing {tasks.length} of {totalTasks} tasks.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead
              className={`w-[100px]`}
              onClick={() => requestSort("priority")}
            >
              Priority <ArrowUpDown className="inline w-3" />
            </TableHead>
            <TableHead onClick={() => requestSort("name")}>
              Task name <ArrowUpDown className="inline w-3" />
            </TableHead>
            <TableHead>Location</TableHead>
            <TableHead onClick={() => requestSort("deadline")}>
              Deadline <ArrowUpDown className="inline w-3" />
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => (
            <TasksTableRow
              key={task.id}
              admin={admin}
              task={task}
              onCheck={onCheck}
              onUncheck={onUncheck}
              isSelected={selectedTasks.includes(task.id)}
            />
          ))}
        </TableBody>
      </Table>
      <PaginationControls
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        totalTasks={totalTasks}
      />
      <div className="mt-6 flex justify-end">
        {selectedTasks.length && admin ? (
          <Button disabled={isMutating && true} asChild>
            <button onClick={() => bulkTasksDelete(selectedTasks)}>
              {isMutating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 w-4" />
              )}
              Delete selected tasks
            </button>
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default TasksTable;
