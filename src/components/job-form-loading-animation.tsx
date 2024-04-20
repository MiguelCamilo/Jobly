import { Skeleton } from "@/components/ui/skeleton"

const JobFormLoadingAnimation = () => {
  return (
    <div className="max-w-[85%] mx-auto my-8 p-6 border rounded-lg space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px] mx-auto" />
        <Skeleton className="h-6 w-[300px]" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-3">
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-[140px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-[140px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-[140px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobFormLoadingAnimation;
