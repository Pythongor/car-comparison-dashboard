"use client";

import CarGridSkeleton from "./skeleton/CarGridSkeleton";
import SortDropdown from "../widgets/SortDropdown";
import { Suspense } from "react";

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

interface CarGridContainerProps {
  params: { brand?: string; sort?: string };
  children: React.ReactNode;
  totalCarsCount?: number;
}

export default function CarGridContainer({
  params,
  children,
}: CarGridContainerProps) {
  return (
    <section className="flex-1 w-full px-4 md:px-6 lg:px-8 py-6 lg:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <p className="text-sm text-gray-500 font-medium">
          Exploring our collection
        </p>
        <SortDropdown groups={CAR_SORT_OPTIONS} defaultKey="brand_asc" />
      </div>

      <Suspense
        key={JSON.stringify(params)}
        fallback={<CarGridSkeleton count={6} />}
      >
        {children}
      </Suspense>
    </section>
  );
}
