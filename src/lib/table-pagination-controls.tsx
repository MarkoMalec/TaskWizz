"use client";

import { FC } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface TablePaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageNumber: number;
  totalPages: number;
}

const TablePaginationControls: FC<TablePaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  pageNumber,
  totalPages,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "8";

  const handlePerPageChange = (newPerPage: string) => {
    router.push(`?page=${Number(page)}&per_page=${newPerPage}`);
  };

  const handlePrevClick = () => {
    router.push(
      `?page=${pageNumber - 1}${per_page && `&per_page=${per_page}`}`,
    );
  };

  const handleNextClick = () => {
    router.push(
      `?page=${pageNumber + 1}${per_page && `&per_page=${per_page}`}`,
    );
  };

  return (
    <div className="flex w-full items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPrevPage}
        onClick={handlePrevClick}
      >
        Previous
      </Button>
      <span className="text-sm">
        page {pageNumber} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={!hasNextPage}
        onClick={handleNextClick}
      >
        Next
      </Button>
      <Select onValueChange={(e: string) => handlePerPageChange(e)}>
        <SelectTrigger className="w-16 h-9">
          <SelectValue placeholder={`${per_page}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="8">8</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TablePaginationControls;
