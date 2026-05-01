"use client";

import { Car } from "@/types";
import CarCard from "./CarCard";
import SortDropdown from "../widgets/SortDropdown";

const CAR_SORT_OPTIONS = [
  {
    groupLabel: "Identity",
    options: [
      { label: "Brand (A-Z)", value: "brand_asc" },
      { label: "Brand (Z-A)", value: "brand_desc" },
      { label: "Model (A-Z)", value: "model_asc" },
      { label: "Model (Z-A)", value: "model_desc" },
      { label: "Body Type (A-Z)", value: "type_asc" },
      { label: "Body Type (Z-A)", value: "type_desc" },
    ],
  },
  {
    groupLabel: "Value & Performance",
    options: [
      { label: "Price: Low to High", value: "price_asc" },
      { label: "Price: High to Low", value: "price_desc" },
      { label: "Top Rated", value: "rating_desc" },
      { label: "Lowest Rated", value: "rating_asc" },
    ],
  },
  {
    groupLabel: "Specifications",
    options: [
      { label: "Weight: Lightest", value: "weight_asc" },
      { label: "Weight: Heaviest", value: "weight_desc" },
    ],
  },
];

interface CarGridProps {
  cars: Car[];
}

export default function CarGrid({ cars }: CarGridProps) {
  return (
    <section className="flex-1 w-full px-4 md:px-6 lg:px-8 py-6 lg:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <p className="text-sm text-gray-500 font-medium">
          Showing <span className="text-gray-900 font-bold">{cars.length}</span>{" "}
          cars
        </p>
        <SortDropdown groups={CAR_SORT_OPTIONS} defaultKey="brand_asc" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
        {cars.map((car, index) => (
          <CarCard key={car.id} car={car} index={index} />
        ))}
      </div>

      {cars.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🚗</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">No cars found</h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto mt-1">
            Try adjusting your filters or resetting them to find what you`re
            looking for.
          </p>
        </div>
      )}
    </section>
  );
}
