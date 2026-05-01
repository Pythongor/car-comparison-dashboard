"use client";

import { Car } from "@/types";
import Image from "next/image";
import { getOptimizedImage } from "@/lib/utils";
import { useComparison } from "@/context/ComparisonContext";

interface CarCardProps {
  car: Car;
  index: number;
}

export default function CarCard({ car, index }: CarCardProps) {
  const { toggleCar, selectedCars, isMaxReached } = useComparison();
  const isSelected = selectedCars.some((c) => c.id === car.id);
  const isDisabled = !isSelected && isMaxReached;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(car.price);

  return (
    <div className="relative group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-lg">
      <div className="absolute top-3 right-3 z-20">
        <label
          className={`
        flex items-center gap-2 px-2 py-1 rounded-md border shadow-sm transition-all
        ${
          isDisabled
            ? "bg-gray-50 border-gray-100 cursor-not-allowed"
            : "bg-white/90 backdrop-blur-sm border-gray-200 cursor-pointer hover:border-blue-300"
        }
      `}
        >
          <input
            type="checkbox"
            checked={isSelected}
            disabled={isDisabled}
            onChange={() => toggleCar(car)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-30 disabled:grayscale"
          />
          <span
            className={`text-[10px] font-black uppercase tracking-tight transition-colors ${
              isDisabled ? "text-gray-400" : "text-gray-700"
            }`}
          >
            {isDisabled ? "Limit Reached" : "Compare"}
          </span>
        </label>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <Image
          src={getOptimizedImage(car.image_url, 600)}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 4}
        />
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-700 backdrop-blur-sm">
            {car.type}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-tight">
              {car.brand}
            </h3>
            <p className="text-xl font-bold text-gray-900">{car.model}</p>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-yellow-50 px-2 py-1 text-yellow-700">
            <span className="text-sm font-bold">{car.rating}</span>
            <span className="text-xs text-yellow-500">★</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-y-2 border-t border-gray-100 pt-4 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">Weight</span>
            <span className="font-semibold text-gray-900">{car.weight} kg</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-gray-500">Price</span>
            <span className="font-bold text-blue-600">{formattedPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
