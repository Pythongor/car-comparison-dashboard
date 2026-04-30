import { sql } from "./sql";

async function verify() {
  console.log("Fetching current image URLs from Neon...");

  try {
    const cars =
      await sql`SELECT id, brand, model, image_url FROM cars LIMIT 15`;

    console.table(
      cars.map((car) => ({
        Vehicle: `${car.brand} ${car.model}`,
        URL: car.image_url,
      })),
    );

    const hasParams = cars.some((car) => car.image_url.includes("?"));
    if (hasParams) {
      console.warn("Warning: Some URLs still have parameters!");
    } else {
      console.log("Success: All sample URLs are clean.");
    }
  } catch (err) {
    console.error("Verification failed:", err);
  } finally {
    process.exit(0);
  }
}

verify();
