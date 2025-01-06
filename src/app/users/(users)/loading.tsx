import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "~/components/ui/table";
import { Checkbox } from "~/components/ui/checkbox";
import { Skeleton } from "~/components/ui/skeleton";

const SkeletonTableRow = () => {
  return (
    <TableRow>
      <TableCell className="w-[89px]">
        <Checkbox />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[40px] w-[40px] rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[150px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[150px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[150px]" />
      </TableCell>
    </TableRow>
  );
};

const loading = () => {
  const tableRows = Array.from({
    length: 8,
  });

  return (
    <div className="mt-[100px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[89px]">
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[60px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[150px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[150px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[150px]" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableRows.map((_, index) => (
            <SkeletonTableRow key={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default loading;
