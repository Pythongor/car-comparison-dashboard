import CarCard from "@/components/dashboard/CarCard";
import FilterContent from "@/components/dashboard/FilterContent";
import { getCars } from "@/lib/db/actions";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const cars = await getCars(params);

  return (
    <main className="container mx-auto p-8 flex flex-col md:flex-row gap-10">
      <FilterContent />
      <section className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        {cars.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No cars found matching your filters.
          </div>
        )}
      </section>
    </main>
  );
}
