"use client";

import { Car } from "@/types";
import Image from "next/image";
import { MinusCircle } from "lucide-react";
import { getOptimizedImage } from "@/lib/utils";

type Value = string | number | null;

const specs = [
  {
    label: "Price",
    key: "price",
    format: (v: Value) => (v ? `$${Number(v).toLocaleString()}` : "N/A"),
  },
  {
    label: "Weight",
    key: "weight",
    format: (v: Value) => (v ? `${v} kg` : "N/A"),
  },
  { label: "Body Type", key: "type" },
  {
    label: "Rating",
    key: "rating",
    format: (v: Value) => (v ? `${v} / 5 ★` : "N/A"),
  },
];

export default function ComparisonTable({
  selectedCars,
  toggleCar,
}: {
  selectedCars: Car[];
  toggleCar: (car: Car) => void;
}) {
  const columnCount = selectedCars.length;

  return (
    <div
      className="w-full max-w-7xl mx-auto p-4 md:p-8"
      style={{ "--cols": columnCount } as React.CSSProperties}
    >
      <div className="flex flex-col md:grid gap-6 md:gap-8 mb-8 md:mb-12 border-b border-gray-100 pb-8 items-end md:[grid-template-columns:160px_repeat(var(--cols),1fr)]">
        <div className="hidden md:block pb-6">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
            Specifications
          </span>
        </div>

        <div className="grid grid-cols-2 md:contents gap-4 w-full">
          {selectedCars.map((car) => (
            <div key={car.id} className="relative group px-1 md:px-2">
              <button
                onClick={() => toggleCar(car)}
                className="absolute -top-2 -right-1 z-30 bg-white text-red-500 rounded-full shadow-lg p-1 md:opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              >
                <MinusCircle size={20} fill="white" />
              </button>

              <div className="relative h-28 sm:h-36 md:h-44 w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm mb-3 border-2 md:border-4 border-white">
                <div className="relative h-28 sm:h-36 md:h-44 w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm mb-3 border-2 md:border-4 border-white">
                  <Image
                    src={getOptimizedImage(car.image_url, 600)}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 300px"
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="font-black text-sm md:text-lg text-gray-900 leading-tight truncate">
                {car.brand}
              </h3>
              <p className="text-[10px] md:text-sm font-bold text-blue-600 uppercase tracking-tighter truncate">
                {car.model}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
        {specs.map((spec, idx) => (
          <div
            key={spec.label}
            className={`flex flex-col md:grid gap-2 md:gap-8 px-6 md:px-10 py-5 md:py-7 md:[grid-template-columns:160px_repeat(var(--cols),1fr)] ${
              idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
            }`}
          >
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 border-b md:border-0 pb-1 md:pb-0 mb-1 md:mb-0">
              {spec.label}
            </span>

            <div className="grid grid-cols-2 md:contents gap-4">
              {selectedCars.map((car) => {
                const val = car[spec.key as keyof typeof car];
                return (
                  <div
                    key={car.id}
                    className="text-left md:text-center text-xs md:text-base font-bold text-gray-900"
                  >
                    <span className="md:hidden text-[8px] block text-gray-300 mb-0.5">
                      {car.brand} {car.model}
                    </span>
                    {spec.format ? spec.format(val) : val}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
