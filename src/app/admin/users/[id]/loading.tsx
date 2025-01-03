import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const loading = () => {
  return (
    <div className="mt-[100px] flex items-center justify-center">
      <Card className="m-auto w-full max-w-[860px]">
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="h-[90px] w-[90px] rounded-full" />
          <div>
            <CardTitle>
              <Skeleton className="mb-3 h-6 w-[120px]" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-5 w-[290px]" />
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-full" />
        </CardContent>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-[100px]" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-3 w-[200px]" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="mb-2 h-3 w-[100px]" />
          <Skeleton className="mb-8 h-8 w-full" />
          <Skeleton className="mb-2 h-3 w-[100px]" />
          <Skeleton className="mb-8 h-8 w-full" />
          <Skeleton className="mb-2 h-3 w-[100px]" />
          <Skeleton className="mb-8 h-8 w-full" />
          <Skeleton className="h-[500px] w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default loading;
