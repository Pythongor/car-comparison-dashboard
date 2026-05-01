"use client";

import Table from "./Table";
import { X } from "lucide-react";
import { useComparison } from "@/context/ComparisonContext";
import { useModalEffect } from "@/hooks/useModalEffect";

export default function ComparisonModal({ onClose }: { onClose: () => void }) {
  const { selectedCars, toggleCar } = useComparison();
  const { modalRef } = useModalEffect(onClose);

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in zoom-in-95 duration-200 outline-none"
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div>
          <h2 className="text-2xl font-black tracking-tighter text-gray-900 uppercase">
            Comparison Engine
          </h2>
          <p className="text-xs text-blue-600 font-black uppercase tracking-widest">
            {selectedCars.length} Vehicles Selected
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close comparison"
          className="p-3 bg-gray-900 text-white rounded-full hover:bg-blue-600 transition-all hover:rotate-90 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-gray-50/30">
        <Table selectedCars={selectedCars} toggleCar={toggleCar} />
      </div>
    </div>
  );
}
