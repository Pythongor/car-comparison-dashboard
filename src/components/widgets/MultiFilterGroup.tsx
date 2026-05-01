"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface MultiFilterGroupProps {
  label: string;
  queryKey: string;
  options: (string | number)[];
}

export default function MultiFilterGroup({
  label,
  queryKey,
  options,
}: MultiFilterGroupProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentValues =
    searchParams.get(queryKey)?.split(",").filter(Boolean) || [];

  const handleToggle = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newValues: string[];

    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v) => v !== value);
    } else {
      newValues = [...currentValues, value];
    }

    if (newValues.length > 0) {
      params.set(queryKey, newValues.join(","));
    } else {
      params.delete(queryKey);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-6 last:mb-0">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete(queryKey);
            router.push(`?${params.toString()}`, { scroll: false });
          }}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
            currentValues.length === 0
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
          }`}
        >
          All
        </button>
        {options.map((option) => {
          const isActive = currentValues.includes(option.toString());
          return (
            <button
              key={option}
              onClick={() => handleToggle(option.toString())}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
