import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

const loading = () => {
  return (
    <div className="grid grid-cols-1 gap-4 pt-10 md:grid-cols-4">
      <div className="col-span-4">
        <Skeleton className="h-[50px] w-full" />
      </div>
      <div className="col-span-1">
        <Skeleton className="h-[500px] w-full" />
      </div>
      <div className="col-span-3">
        <Skeleton className="h-[500px] w-full" />
      </div>
    </div>
  );
};

export default loading;
