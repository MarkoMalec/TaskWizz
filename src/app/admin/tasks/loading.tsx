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
import { Skeleton } from "~/components/ui/skeleton";

const loading = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="h-4 w-[150px]" />
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
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-[150px]" />
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
      </TableBody>
    </Table>
  );
};

export default loading;
