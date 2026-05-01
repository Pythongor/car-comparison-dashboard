import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Car } from "@/types";
import { ComparisonProvider } from "@/context/ComparisonContext";
import Tray from "../Tray";

const MOCK_CAR: Car = {
  id: "1",
  brand: "Tesla",
  model: "Model 3",
  type: "Electric",
  price: 38990,
  weight: 1765,
  rating: 4.8,
  image_url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
  description: "The quintessential modern electric sedan.",
};

const renderWithProvider = (selectedCars: Car[]) => {
  return render(
    <ComparisonProvider initialValue={selectedCars}>
      <Tray />
    </ComparisonProvider>,
  );
};

describe("ComparisonTray", () => {
  it("should return null (not render) when no cars are selected", () => {
    const { container } = renderWithProvider([]);
    expect(container.firstChild).toBeNull();
  });

  it('should render the "Compare" button when cars are selected', () => {
    renderWithProvider([MOCK_CAR]);

    const compareButton = screen.getByRole("button", { name: /compare/i });
    expect(compareButton).toBeInTheDocument();
    expect(screen.getByText("(1)")).toBeInTheDocument();
  });

  it('should disable the "Compare" button if only one car is selected', () => {
    renderWithProvider([MOCK_CAR]);

    const compareButton = screen.getByRole("button", { name: /compare/i });
    expect(compareButton).toBeDisabled();
  });

  it("should clear the tray when the Clear button is clicked", () => {
    renderWithProvider([MOCK_CAR]);

    const clearButton = screen.getByTitle(/clear all/i);
    fireEvent.click(clearButton);

    expect(screen.queryByText("Tesla")).not.toBeInTheDocument();
  });
});
