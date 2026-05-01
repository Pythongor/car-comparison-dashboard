"use client";

import { Car } from "@/types";
import CarCard from "./CarCard";

interface CarGridProps {
  cars: Car[];
}

export default function CarGrid({ cars }: CarGridProps) {
  return (
    <>
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
    </>
  );
}
