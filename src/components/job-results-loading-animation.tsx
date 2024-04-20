import { Skeleton } from "@/components/ui/skeleton";

const JobResultsLoadingAnimation = () => {
  return (
    <div className="flex flex-col p-6 md:flex-row md:space-x-6">
      <div className="w-full mb-5 sm:mb-0 space-y-4 md:w-1/4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-12 w-full" />
      </div>
      
      <div className="w-full space-y-4 md:w-3/4">
        {Array.from(Array(8).keys()).map((i) => (
          <div key={i} className="space-y-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="flex-grow space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="col-span-2 h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobResultsLoadingAnimation;
