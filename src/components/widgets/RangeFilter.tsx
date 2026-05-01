"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface RangeFilterProps {
  label: string;
  minKey: string;
  maxKey: string;
  absoluteMin: number;
  absoluteMax: number;
  step?: number;
  unit?: string;
  unitPosition?: "prefix" | "suffix";
}

const CompactInput = ({
  value,
  onChange,
  unit,
  unitPosition,
}: {
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  unitPosition?: "prefix" | "suffix";
}) => (
  <div className="relative flex-1 group">
    {unitPosition === "prefix" && (
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 group-focus-within:text-blue-500 pointer-events-none">
        {unit}
      </span>
    )}
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`w-full py-1 text-xs font-semibold text-gray-900 border border-gray-100 rounded bg-gray-50/50 outline-none focus:bg-white focus:border-blue-300 transition-all ${
        unitPosition === "prefix" ? "pl-5 pr-2" : "pl-2 pr-8"
      }`}
    />
    {unitPosition === "suffix" && (
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 group-focus-within:text-blue-500 pointer-events-none">
        {unit}
      </span>
    )}
  </div>
);

export default function RangeFilter({
  label,
  minKey,
  maxKey,
  absoluteMin,
  absoluteMax,
  step = 1,
  unit,
  unitPosition,
}: RangeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const snapValue = (val: number) => {
    if (val <= absoluteMin + step / 2) return absoluteMin;
    if (val >= absoluteMax - step / 2) return absoluteMax;

    const snapped = Math.round(val / step) * step;
    const clamped = Math.max(absoluteMin, Math.min(absoluteMax, snapped));

    return parseFloat(clamped.toFixed(1));
  };

  const [min, setMin] = useState(
    Number(searchParams.get(minKey)) || absoluteMin,
  );
  const [max, setMax] = useState(
    Number(searchParams.get(maxKey)) || absoluteMax,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      const currentUrlMin = Number(params.get(minKey)) || absoluteMin;
      const currentUrlMax = Number(params.get(maxKey)) || absoluteMax;

      if (min !== currentUrlMin || max !== currentUrlMax) {
        if (min > absoluteMin) params.set(minKey, min.toString());
        else params.delete(minKey);

        if (max < absoluteMax) params.set(maxKey, max.toString());
        else params.delete(maxKey);

        router.push(`?${params.toString()}`, { scroll: false });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [min, max, absoluteMin, absoluteMax, minKey, maxKey, router]);

  const range = absoluteMax - absoluteMin;
  const minPercent = ((min - absoluteMin) / range) * 100;
  const maxPercent = ((max - absoluteMin) / range) * 100;

  return (
    <div className="mb-4 last:mb-0 border-b border-gray-50 pb-4 last:border-0">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </h3>

      <div className="flex items-center gap-2 mb-3">
        <CompactInput
          value={min}
          onChange={(v) => setMin(snapValue(v))}
          unit={unit}
          unitPosition={unitPosition}
        />
        <CompactInput
          value={max}
          onChange={(v) => setMax(snapValue(v))}
          unit={unit}
          unitPosition={unitPosition}
        />
      </div>

      <div className="relative h-6 flex items-center px-[9px]">
        <div className="relative w-full h-1">
          <div className="absolute inset-0 bg-gray-100 rounded-full" />
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        </div>

        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          step={step}
          value={min}
          onChange={(e) =>
            setMin(Math.min(snapValue(Number(e.target.value)), max - step))
          }
          className="range-input"
        />
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          step={step}
          value={max}
          onChange={(e) =>
            setMax(Math.max(snapValue(Number(e.target.value)), min + step))
          }
          className="range-input"
        />
      </div>

      <style jsx>{`
        .range-input {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          pointer-events: none;
          appearance: none;
          background: transparent;
          z-index: 20;
          outline: none;
        }

        .range-input::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: white;
          border: 2px solid #3b82f6;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }

        @media (min-width: 1024px) {
          .range-input::-webkit-slider-thumb {
            height: 14px;
            width: 14px;
          }
        }
      `}</style>
    </div>
  );
}
