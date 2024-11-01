"use client";

import React, { useEffect, useState, useMemo } from "react";
import { DataTableToolbar } from "./tasks-table-toolbar";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  RowData,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import TablePaginationControls from "~/lib/table-pagination-controls";

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageNumber: number;
  totalPages: number;
  perPage: number;
  admin: boolean;
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    isAdmin: true | false;
  }
}

export function TasksTable<TData extends { id: string }, TValue>({
  columns,
  data,
  hasNextPage,
  hasPrevPage,
  pageNumber,
  totalPages,
  perPage,
  admin,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: perPage,
  });

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageSize: perPage,
    }));
  }, [perPage, setPagination]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      columnVisibility,
      columnFilters,
      sorting,
      rowSelection,
      pagination,
    },
    meta: {
      isAdmin: admin,
    },
  });

  const getSelectedTaskIds = () => {
    return Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((index) => {
        const item = data[parseInt(index)];
        return item ? item.id : null;
      })
      .filter((id): id is string => id !== null);
  };

  return (
    <>
      <DataTableToolbar
        table={table}
        selectedTasks={getSelectedTaskIds}
        setRowSelection={setRowSelection}
        rowSelection={rowSelection}
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePaginationControls
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
        pageNumber={pageNumber}
        totalPages={totalPages}
      />
    </>
  );
}
