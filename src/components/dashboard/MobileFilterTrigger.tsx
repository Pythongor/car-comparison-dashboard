"use client";

import { Filter, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileFilterTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold shadow-[0_20px_50px_rgba(0,0,0,0.3)] active:scale-95 transition-transform"
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-lg mx-auto bg-white rounded-t-[3rem] shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-500 overflow-hidden">
            <div className="flex-shrink-0 pt-4 pb-2">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto" />
            </div>

            <div className="flex-shrink-0 flex items-center justify-between px-8 py-4 border-b border-gray-50">
              <span className="font-bold text-[10px] uppercase tracking-widest text-gray-400">
                Refine Results
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="px-8 py-10 space-y-10 pb-20">{children}</div>
            </div>

            <div className="flex-shrink-0 p-6 bg-white border-t border-gray-100">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
