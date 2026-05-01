export function CarCardSkeleton() {
  return (
    <div className="relative border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse">
      <div className="absolute top-3 right-3 z-10 w-16 h-6 bg-gray-200 rounded-md" />

      <div className="aspect-[16/10] w-full bg-gray-200" />

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-3 w-1/2 bg-gray-100 rounded" />
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="h-5 w-1/4 bg-gray-200 rounded-lg" />
          <div className="h-4 w-1/6 bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  );
}
