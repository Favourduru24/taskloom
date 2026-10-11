export default function DashboardCardSkeleton() {
  return (
    <section
      aria-label="Loading dashboard section"
      aria-busy="true"
      className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-5 w-40 animate-pulse rounded-md bg-gray-200" />
          <div className="h-3 w-56 max-w-full animate-pulse rounded-md bg-gray-100" />
        </div>

        <div className="h-9 w-24 shrink-0 animate-pulse rounded-lg bg-gray-100" />
      </div>

      {/* List rows */}
      <div className="divide-y divide-gray-100">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 py-4 sm:gap-4"
          >
            {/* Avatar */}
            <div className="size-11 shrink-0 animate-pulse rounded-full bg-gray-200" />

            {/* Main content */}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-32 max-w-full animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-48 max-w-full animate-pulse rounded bg-gray-100" />
            </div>

            {/* Status / metadata */}
            <div className="hidden shrink-0 space-y-2 sm:block">
              <div className="h-4 w-16 animate-pulse rounded-full bg-gray-100" />
              <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
            </div>

            {/* Action button */}
            <div className="h-9 w-16 shrink-0 animate-pulse rounded-lg bg-gray-200 sm:w-20" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="h-3 w-28 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
      </div>
    </section>
  );
}
