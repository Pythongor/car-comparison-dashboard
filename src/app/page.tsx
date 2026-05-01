import { getDataBounds, getFilterOptions } from "@/lib/db/actions";

import CarFeed from "@/components/dashboard/CarFeed";
import CarGridSkeleton from "@/components/dashboard/skeleton/CarGridSkeleton";
import FilterContent from "@/components/dashboard/FilterContent";
import MobileFilterTrigger from "@/components/dashboard/MobileFilterTrigger";
import { Suspense } from "react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const [options, bounds] = await Promise.all([
    getFilterOptions(),
    getDataBounds(),
  ]);

  return (
    <main className="flex flex-col flex-1 lg:flex-row min-h-screen bg-gray-50">
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between p-4 bg-white border-b shadow-sm">
        <h1 className="font-bold text-xl">Explore Cars</h1>
        <MobileFilterTrigger>
          <FilterContent options={options} bounds={bounds} />
        </MobileFilterTrigger>
      </div>
      <aside className="hidden lg:block w-72 p-6 border-r bg-white h-screen sticky top-0 overflow-y-auto">
        <FilterContent options={options} bounds={bounds} />
      </aside>
      <section className="flex-1 p-6 md:p-10">
        <Suspense
          key={JSON.stringify(params)}
          fallback={<CarGridSkeleton count={8} />}
        >
          <CarFeed params={params} />
        </Suspense>
      </section>
    </main>
  );
}
