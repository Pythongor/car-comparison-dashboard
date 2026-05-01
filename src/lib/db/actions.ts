"use server";

import { Car, DataBounds, FilterOptions } from "@/types";

import { sql } from "./sql";

export async function getCars(params?: {
  brand?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  minWeight?: string;
  maxWeight?: string;
  minRating?: string;
  maxRating?: string;
  sort?: string;
}) {
  const brands = params?.brand ? params.brand.split(",") : null;
  const types = params?.type ? params.type.split(",") : null;

  const minP = Number(params?.minPrice) || 0;
  const maxP = Number(params?.maxPrice) || 10000000;
  const minW = Number(params?.minWeight) || 0;
  const maxW = Number(params?.maxWeight) || 100000;
  const minR = Number(params?.minRating) || 0;
  const maxR = Number(params?.maxRating) || 5;

  try {
    return await sql<Car[]>`
      SELECT * FROM cars
      WHERE 1=1
      ${brands ? sql`AND brand = ANY(${brands})` : sql``}
      ${types ? sql`AND type = ANY(${types})` : sql``}
      AND price BETWEEN ${minP} AND ${maxP}
      AND weight BETWEEN ${minW} AND ${maxW}
      AND rating BETWEEN ${minR} AND ${maxR}
      ORDER BY 
        ${params?.sort === "price_asc" ? sql`price ASC` : sql`price DESC`}
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function getFilterOptions(): Promise<FilterOptions> {
  const [brands, types] = await Promise.all([
    sql<
      { brand: string }[]
    >`SELECT DISTINCT brand FROM cars ORDER BY brand ASC`,
    sql<{ type: string }[]>`SELECT DISTINCT type FROM cars ORDER BY type ASC`,
  ]);

  return {
    brands: brands.map((b) => b.brand),
    types: types.map((t) => t.type),
    ratings: [4, 3, 2],
  };
}

export async function getDataBounds(): Promise<DataBounds> {
  try {
    const data = await sql`
      SELECT 
        MIN(price) as min_price, MAX(price) as max_price,
        MIN(weight) as min_weight, MAX(weight) as max_weight,
        MIN(rating) as min_rating, MAX(rating) as max_rating
      FROM cars
    `;

    return {
      price: {
        min: Number(data[0].min_price) || 0,
        max: Number(data[0].max_price) || 1000000,
      },
      weight: {
        min: Number(data[0].min_weight) || 0,
        max: Number(data[0].max_weight) || 5000,
      },
      rating: {
        min: Number(data[0].min_rating) || 0,
        max: Number(data[0].max_rating) || 5,
      },
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      price: { min: 0, max: 1000000 },
      weight: { min: 0, max: 5000 },
      rating: { min: 0, max: 5 },
    };
  }
}
