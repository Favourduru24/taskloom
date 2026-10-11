
const Skeleton = ({ className = "" }) => (
    <div
      className={`animate-pulse rounded-md bg-gray-200/80 ${className}`}
    />
  );
  
  const ContactsSkeleton = () => {
    return (
      <div className="min-h-screen bg-white py-6">
        {/* Page heading and actions */}
        <div className="mb-9 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-5 w-80 max-w-full" />
          </div>
  
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-[52px] w-full rounded-xl sm:w-[300px] lg:w-[400px]" />
            <Skeleton className="h-[52px] w-full rounded-xl sm:w-[200px]" />
          </div>
        </div>
  
        {/* Contacts table */}
        <div className="w-full overflow-hidden">
          <div className="min-w-[850px]">
            {/* Table header */}
            <div className="grid grid-cols-[60px_2fr_0.85fr_1.1fr_1.2fr_0.8fr_0.6fr] items-center gap-4 border-y border-gray-200 bg-gray-50 px-5 py-5">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
  
            {/* Contact rows */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[60px_2fr_0.85fr_1.1fr_1.2fr_0.8fr_0.6fr] items-center gap-4 border-b border-gray-200 px-5 py-7"
              >
                {/* Checkbox */}
                <Skeleton className="h-6 w-6 rounded-md" />
  
                {/* Avatar and contact information */}
                <div className="flex min-w-0 items-center gap-4">
                  <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
  
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-5 w-36 max-w-full" />
                    <Skeleton className="h-4 w-48 max-w-full" />
                  </div>
                </div>
  
                {/* Source */}
                <Skeleton className="h-5 w-20" />
  
                {/* Last contact date */}
                <Skeleton className="h-5 w-28" />
  
                {/* Next follow-up */}
                <Skeleton className="h-5 w-12" />
  
                {/* Status badge */}
                <Skeleton className="h-9 w-24 rounded-full" />
  
                {/* Action icon */}
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ContactsSkeleton;
  