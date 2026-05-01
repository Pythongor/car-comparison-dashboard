"use client";

import { ArrowRightLeft, Trash2, X } from "lucide-react";

import Image from "next/image";
import dynamic from "next/dynamic";
import { getOptimizedImage } from "@/lib/utils";
import { useComparison } from "@/context/ComparisonContext";
import { useState } from "react";

const Modal = dynamic(() => import("./Modal"), {
  loading: () => <p>Loading...</p>,
});

export default function ComparisonTray() {
  const { selectedCars, toggleCar, clearComparison } = useComparison();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (selectedCars.length === 0) return null;

  const isComparisonDisabled = selectedCars.length < 2;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-3 md:p-4 animate-in slide-in-from-bottom duration-300">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-3 md:gap-6">
          <div className="flex flex-1 items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1">
            {selectedCars.map((car) => (
              <div
                key={car.id}
                className="flex-shrink-0 flex items-center gap-2 bg-gray-50 pl-1.5 pr-2.5 py-1 md:pl-2 md:pr-3 md:py-1.5 rounded-full border border-gray-100 group transition-all"
              >
                <div className="relative w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden border border-white flex-shrink-0">
                  <Image
                    src={getOptimizedImage(car.image_url, 64)}
                    alt={car.brand}
                    fill
                    sizes="(max-width: 768px) 24px, 32px"
                    className="object-cover"
                  />
                </div>

                <span className="text-[10px] md:text-[11px] font-black text-gray-700 whitespace-nowrap max-w-[60px] md:max-w-none truncate">
                  {car.brand}
                </span>

                <button
                  onClick={() => toggleCar(car)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                  aria-label={`Remove ${car.brand}`}
                >
                  <X size={12} className="md:w-[14px] md:h-[14px]" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <button
              onClick={clearComparison}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Clear all"
            >
              <Trash2 size={18} className="md:hidden" />
              <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <Trash2 size={14} />
                Clear
              </div>
            </button>

            <button
              disabled={isComparisonDisabled}
              onClick={() => setIsModalOpen(true)}
              title={
                isComparisonDisabled
                  ? "Select at least 2 cars to compare"
                  : "Open comparison"
              }
              className={`
                flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-black uppercase tracking-tighter transition-all
                ${
                  isComparisonDisabled
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-70 shadow-none"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 active:scale-95"
                }
              `}
            >
              <ArrowRightLeft size={16} />
              <span className="hidden sm:inline">Compare</span>
              <span>({selectedCars.length})</span>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
