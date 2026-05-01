"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { ChevronDown } from "lucide-react";
import { SortDropdownProps } from "@/types";

export default function SortDropdown({
  groups,
  defaultKey,
  queryParam = "sort",
}: SortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get(queryParam) || defaultKey;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(queryParam, e.target.value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3">
      <label className="hidden sm:block text-[10px] font-black text-gray-400 uppercase tracking-widest">
        Sort By
      </label>
      <div className="relative">
        <select
          suppressHydrationWarning
          value={currentSort}
          onChange={handleSortChange}
          className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-bold text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer shadow-sm hover:border-gray-300"
        >
          {groups.map((group) =>
            group.groupLabel ? (
              <optgroup key={group.groupLabel} label={group.groupLabel}>
                {group.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ) : (
              group.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            ),
          )}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={14}
        />
      </div>
    </div>
  );
}
