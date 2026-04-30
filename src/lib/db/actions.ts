"use server";

import { Car } from "@/types";
import { sql } from "./sql";

export async function getCars(searchParams: { brand?: string; sort?: string }) {
  const { brand, sort } = searchParams;

  try {
    const data = await sql<Car[]>`
      SELECT * FROM cars
      WHERE 1=1
      ${brand ? sql`AND brand = ${brand}` : sql``}
      ORDER BY 
        ${
          sort === "price_asc"
            ? sql`price ASC`
            : sort === "weight_asc"
              ? sql`weight ASC`
              : sql`price DESC`
        }
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch car data.");
  }
}

export async function getFilteredCars(query: string): Promise<Car[]> {
  try {
    const data = await sql<Car[]>`
      SELECT * FROM cars
      WHERE 
        brand ILIKE ${"%" + query + "%"} OR
        model ILIKE ${"%" + query + "%"} OR
        type ILIKE ${"%" + query + "%"}
      ORDER BY price DESC
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to filter cars.");
  }
}
