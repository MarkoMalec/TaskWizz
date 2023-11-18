"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalTasks: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  totalTasks,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "8";

  const handlePerPageChange = (newPerPage: string) => {
    router.push(`?page=${Number(page)}&per_page=${newPerPage}`);
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        className="rounded bg-secondary px-2 py-1"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        Prev
      </button>

      <div className="text-sm">
        Page {page} of {Math.ceil(totalTasks / Number(per_page))}
      </div>

      <button
        className="rounded bg-secondary px-2 py-1"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        Next
      </button>
      <Select onValueChange={(e: string) => handlePerPageChange(e)}>
        <SelectTrigger className="w-16">
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

export default PaginationControls;
