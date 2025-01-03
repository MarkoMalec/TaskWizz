import React from "react";
import { Table, RowSelectionState } from "@tanstack/react-table";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { DataTableViewOptions } from "./tasks-table-view-options";
import { DataTableFacetedFilter } from "./tasks-table-faceted-filter";
import { useIsMobile } from "~/hooks/use-mobile";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import { toast } from "react-hot-toast";
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
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

const filterOptions = {
  statuses: [
    { value: "Pending", label: "Pending" },
    { value: "In progress", label: "In progress" },
    { value: "Finished", label: "Finished" },
  ],
  priorities: [
    { value: "Low", label: "Low" },
    { value: "Normal", label: "Normal" },
    { value: "High", label: "High" },
  ],
};

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  selectedTasks: () => string[];
  setRowSelection: (selection: RowSelectionState) => void;
  rowSelection: RowSelectionState;
}

interface FilterControlsProps<TData> {
  table: Table<TData>;
}

interface DeleteButtonProps {
  selectedTasks: string[];
  onDelete: () => void;
  disabled: boolean;
}

interface ResetButtonProps {
  isFiltered: boolean;
  onReset: () => void;
}

interface DesktopControlsProps<TData> {
  table: Table<TData>;
  selectedTasks: string[];
  onDelete: () => void;
}

interface MobileControlsProps<TData> {
  table: Table<TData>;
}

const FilterControls = <TData,>({ table }: FilterControlsProps<TData>) => (
  <div className="flex gap-2">
    {table.getColumn("status") && (
      <DataTableFacetedFilter
        column={table.getColumn("status")}
        title="Status"
        options={filterOptions.statuses}
      />
    )}
    {table.getColumn("priority") && (
      <DataTableFacetedFilter
        column={table.getColumn("priority")}
        title="Priority"
        options={filterOptions.priorities}
      />
    )}
  </div>
);

const DeleteButton = ({
  selectedTasks,
  onDelete,
  disabled,
}: DeleteButtonProps) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        variant="destructive"
        size="sm"
        disabled={disabled}
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
          {selectedTasks.length} task
          {selectedTasks.length > 1 ? "s" : ""} from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const ResetButton = ({ isFiltered, onReset }: ResetButtonProps) =>
  isFiltered && (
    <Button variant="ghost" onClick={onReset} className="h-8 px-2 lg:px-3">
      Reset
      <Plus className="ml-2 h-4 w-4" />
    </Button>
  );

const DesktopControls = <TData,>({
  table,
  selectedTasks,
  onDelete,
}: DesktopControlsProps<TData>) => (
  <>
    <FilterControls table={table} />
    <ResetButton
      isFiltered={table.getState().columnFilters.length > 0}
      onReset={() => table.resetColumnFilters()}
    />
    <DeleteButton
      selectedTasks={selectedTasks}
      onDelete={onDelete}
      disabled={selectedTasks.length === 0}
    />
    <DataTableViewOptions table={table} />
  </>
);

const MobileControls = <TData,>({ table }: MobileControlsProps<TData>) => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="ghost" size="sm" className="h-8 px-2 lg:px-3">
        <Settings />
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Table options</DrawerTitle>
        <DrawerDescription>
          Filter and view options for the tasks table
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4">
        <div className="mb-4">
          <FilterControls table={table} />
          <ResetButton
            isFiltered={table.getState().columnFilters.length > 0}
            onReset={() => table.resetColumnFilters()}
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>
    </DrawerContent>
  </Drawer>
);

export function DataTableToolbar<TData>({
  table,
  selectedTasks,
  setRowSelection,
  rowSelection
}: DataTableToolbarProps<TData>) {
  const isMobile = useIsMobile();
  const { doFetch } = useMutatingFetch();
  const selectedTaskIds = selectedTasks();

  const handleBulkDelete = async () => {
    doFetch(
      "/api/tasks/bulkDelete",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskIds: selectedTaskIds }),
      },
      () => toast.success("Bulk delete complete"),
      () => setRowSelection({}),
    );
  };

  return (
    <div className="flex gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <Input
        placeholder="Filter tasks..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="h-8 w-full sm:w-full lg:w-[250px]"
      />
      <div className="flex justify-end space-x-2">
        {isMobile ? (
          <MobileControls table={table} />
        ) : (
          <DesktopControls
            table={table}
            selectedTasks={selectedTaskIds}
            onDelete={handleBulkDelete}
          />
        )}
      </div>
    </div>
  );
}

export default DataTableToolbar;
