import { CarCardSkeleton } from "./CarCardSkeleton";

export default function CarGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="flex-1 w-full px-4 md:px-6 lg:px-8 py-6 lg:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-8 bg-gray-100 rounded animate-pulse" />
          <div className="h-10 w-44 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
