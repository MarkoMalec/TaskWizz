import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
  } from "~/components/ui/table";
  import { Skeleton } from '~/components/ui/skeleton';

const loading = () => {
  return (
    <Table>
        <TableHeader>
            <TableHead><Skeleton className="w-[150px] h-4" /></TableHead>
            <TableHead><Skeleton className="w-[150px] h-4" /></TableHead>
            <TableHead><Skeleton className="w-[150px] h-4" /></TableHead>
            <TableHead><Skeleton className="w-[150px] h-4" /></TableHead>
        </TableHeader>
        <TableBody>
            <TableCell><Skeleton className="w-[150px] h-4" /></TableCell>
            <TableCell><Skeleton className="w-[150px] h-4" /></TableCell>
            <TableCell><Skeleton className="w-[150px] h-4" /></TableCell>
            <TableCell><Skeleton className="w-[150px] h-4" /></TableCell>
        </TableBody>
        </Table>
  )
}

export default loading;