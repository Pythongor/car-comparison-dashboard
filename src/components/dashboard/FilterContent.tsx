"use client";

import { DataBounds, FilterOptions } from "@/types";

import MultiFilterGroup from "../widgets/MultiFilterGroup";
import RangeFilter from "../widgets/RangeFilter";

export default function FilterContent({
  options,
  bounds,
}: {
  options: FilterOptions;
  bounds: DataBounds;
}) {
  return (
    <>
      <MultiFilterGroup
        label="Brand"
        queryKey="brand"
        options={options.brands}
      />
      <MultiFilterGroup label="Type" queryKey="type" options={options.types} />
      <RangeFilter
        label="Price"
        minKey="minPrice"
        maxKey="maxPrice"
        absoluteMin={bounds.price.min}
        absoluteMax={bounds.price.max}
        step={1000}
        unit="$"
        unitPosition="prefix"
      />
      <RangeFilter
        label="Weight"
        minKey="minWeight"
        maxKey="maxWeight"
        absoluteMin={bounds.weight.min}
        absoluteMax={bounds.weight.max}
        step={50}
        unit="kg"
        unitPosition="suffix"
      />
      <RangeFilter
        label="Rating"
        minKey="minRating"
        maxKey="maxRating"
        absoluteMin={bounds.rating.min}
        absoluteMax={bounds.rating.max}
        step={0.1}
        unit=""
        unitPosition="suffix"
      />
    </>
  );
}
