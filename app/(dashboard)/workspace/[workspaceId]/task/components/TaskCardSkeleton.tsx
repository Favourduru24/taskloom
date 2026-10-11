
const Skeleton = ({ className = "" }) => (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
    />
  );
  
  const TaskCardSkeleton = () => {
    return (
        <div className="grid gap-x-4 gap-y-8 grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[20px] border-gray-200 bg-white p-3.5 shadow-xs"
          >
            {/* Category and menu */}
            <div className="mb-5 flex items-center justify-between">
              <Skeleton className="h-10 w-28 rounded-lg bg-purple-100" />
              <Skeleton className="h-6 w-2 rounded-full" />
            </div>
      
            {/* Cover image */}
            <Skeleton className="h-[120px] w-full rounded-xl" />
      
            {/* Title and description */}
            <div className="mt-7 space-y-3 px-1.5">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-3 w-full" />
            </div>
      
            {/* Due date and status */}
            <div className="mt-4 flex items-center justify-between gap-3 px-1.5">
              <Skeleton className="h-10 w-36 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
      
            {/* Assignee and progress */}
            <div className="mt-4 flex items-center justify-between px-1.5 pb-1">
              <Skeleton className="h-9 w-9 rounded-full" />
      
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-7 rounded-full" />
                <Skeleton className="h-6 w-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default TaskCardSkeleton;
  