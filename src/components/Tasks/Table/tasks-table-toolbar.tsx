"use client";

import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import { Table, RowSelectionState } from "@tanstack/react-table";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { DataTableViewOptions } from "./tasks-table-view-options";
import { DataTableFacetedFilter } from "./tasks-table-faceted-filter";
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
import { toast } from "react-hot-toast";
import { useIsMobile } from "~/hooks/use-mobile";
import { Plus, Loader2, Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  selectedTasks: () => string[];
  rowSelection?: RowSelectionState;
  setRowSelection: (value: RowSelectionState) => void;
}

export const statuses = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "In progress",
    label: "In progress",
  },
  {
    value: "Finished",
    label: "Finished",
  },
];

export const priorities = [
  {
    value: "Low",
    label: "Low",
  },
  {
    value: "Normal",
    label: "Normal",
  },
  {
    value: "High",
    label: "High",
  },
];

export function DataTableToolbar<TData>({
  table,
  selectedTasks,
  setRowSelection,
}: DataTableToolbarProps<TData>) {
  const isMobile = useIsMobile();
  const { isMutating, doFetch } = useMutatingFetch();
  const isFiltered = table.getState().columnFilters.length > 0;

  const bulkTasksDelete = async () => {
    const selectedTaskIds = selectedTasks();

    doFetch(
      "/api/tasks/bulkDelete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskIds: selectedTaskIds,
        }),
      },
      () => {
        toast.success("Bulk delete complete");
      },
      () => setRowSelection({}),
    );
  };

  return (
    <div className="flex flex-col space-y-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex flex-col space-y-2 sm:flex-row sm:flex-wrap sm:items-center sm:space-x-2 sm:space-y-0">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full sm:w-full lg:w-[250px]"
        />
        <div className="flex gap-2">
          {table.getColumn("status") && (
            <div className="">
              <DataTableFacetedFilter
                column={table.getColumn("status")}
                title="Status"
                options={statuses}
              />
            </div>
          )}
          {table.getColumn("priority") && (
            <div className="">
              <DataTableFacetedFilter
                column={table.getColumn("priority")}
                title="Priority"
                options={priorities}
              />
            </div>
          )}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        {!isMobile ? (
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={selectedTasks().length === 0}
                  className="h-8 px-2 lg:px-3"
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete{" "}
                    {selectedTasks().length} task
                    {selectedTasks().length > 1 ? "s" : ""} from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={bulkTasksDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DataTableViewOptions table={table} />
          </>
        ) : (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2 lg:px-3">
                <Settings />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerTitle>View options</DrawerTitle>
              <DataTableViewOptions table={table} />
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
}
