import CarCard from "@/components/CarCard";
import { getCars } from "@/lib/db/actions";

export default async function DashboardPage() {
  const cars = await getCars({});

  console.log("FIRST CAR IMAGE URL:", cars[0]?.image_url);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Car Comparison <span className="text-blue-600">Dashboard</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Compare the best models for your next journey.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </main>
  );
}
