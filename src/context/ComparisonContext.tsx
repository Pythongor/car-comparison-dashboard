"use client";

import { ReactNode, createContext, useContext, useState } from "react";

import { Car } from "@/types";

const MAX_CARS = 4;

interface ComparisonContextType {
  selectedCars: Car[];
  toggleCar: (car: Car) => void;
  clearComparison: () => void;
  isMaxReached: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined,
);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);

  const toggleCar = (car: Car) => {
    setSelectedCars((prev) => {
      const isAlreadySelected = prev.some((c) => c.id === car.id);

      if (isAlreadySelected) {
        return prev.filter((c) => c.id !== car.id);
      }

      if (prev.length < MAX_CARS) {
        return [...prev, car];
      }

      return prev;
    });
  };

  const clearComparison = () => setSelectedCars([]);

  const isMaxReached = selectedCars.length >= MAX_CARS;

  return (
    <ComparisonContext.Provider
      value={{
        selectedCars,
        toggleCar,
        clearComparison,
        isMaxReached,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
};
