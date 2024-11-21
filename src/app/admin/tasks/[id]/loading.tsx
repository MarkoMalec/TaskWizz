import React from 'react';
import { Skeleton } from '~/components/ui/skeleton';

const loading = () => {
  return (
    <div className="py-10">
      <Skeleton className="w-full h-[500px]" />
    </div>
  )
}

export default loading;