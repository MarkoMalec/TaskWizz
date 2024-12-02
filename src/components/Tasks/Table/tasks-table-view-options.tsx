"use client";

import { useEffect } from "react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { SlidersHorizontalIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";

import { useMediaQuery } from "~/lib/hooks/useMediaQuery";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const isMobile = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    if (isMobile) {
      table.getColumn("city")?.toggleVisibility(false);
      table.getColumn("deadline")?.toggleVisibility(false);
    } else {
      table.getColumn("city")?.toggleVisibility(true);
      table.getColumn("deadline")?.toggleVisibility(true);
    }
  }, [isMobile, table]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
          <SlidersHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
