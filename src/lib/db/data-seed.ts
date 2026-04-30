import * as dotenv from "dotenv";

import path from "path";
import { sql } from "./sql";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

export const CARS = [
  {
    id: "1",
    brand: "Tesla",
    model: "Model 3",
    type: "Electric",
    price: 38990,
    weight: 1765,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
    description:
      "The quintessential modern electric sedan with industry-leading range.",
  },
  {
    id: "2",
    brand: "BMW",
    model: "i4",
    type: "Electric",
    price: 52200,
    weight: 2050,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068",
    description:
      "The ultimate driving machine, now with a silent electric heart.",
  },
  {
    id: "3",
    brand: "Toyota",
    model: "RAV4",
    type: "Hybrid",
    price: 31475,
    weight: 1610,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb",
    description: "A reliable and spacious compact SUV perfect for families.",
  },
  {
    id: "4",
    brand: "Porsche",
    model: "911 Carrera",
    type: "Gasoline",
    price: 114400,
    weight: 1505,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    description: "The gold standard of sports cars for over half a century.",
  },
  {
    id: "5",
    brand: "Hyundai",
    model: "Ioniq 5",
    type: "Electric",
    price: 41800,
    weight: 2020,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1647418552401-f3958302b72a",
    description:
      "Retro-futuristic design meets ultra-fast charging technology.",
  },
  {
    id: "6",
    brand: "Audi",
    model: "e-tron GT",
    type: "Electric",
    price: 106500,
    weight: 2276,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1655126275641-21e114342284",
    description:
      "A grand tourer that combines high-performance electric power with Audi's signature luxury.",
  },
  {
    id: "7",
    brand: "Ford",
    model: "Mustang Mach-E",
    type: "Electric",
    price: 43495,
    weight: 1993,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1610286304609-6e3ed57352d7",
    description:
      "An electric SUV with the soul of a pony car, offering impressive tech and agility.",
  },
  {
    id: "8",
    brand: "Honda",
    model: "Civic Type R",
    type: "Gasoline",
    price: 44795,
    weight: 1446,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1605756580041-21312e9fb2bc",
    description:
      "The ultimate front-wheel-drive performance machine, built for both track and street.",
  },
  {
    id: "9",
    brand: "Mercedes-Benz",
    model: "EQS Sedan",
    type: "Electric",
    price: 104400,
    weight: 2510,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
    description:
      "The pinnacle of electric luxury, featuring the futuristic Hyperscreen dashboard.",
  },
  {
    id: "10",
    brand: "Rivian",
    model: "R1T",
    type: "Electric",
    price: 73000,
    weight: 3242,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1654475677197-93252b0758aa",
    description:
      "An adventurous electric pickup truck capable of tackling any terrain.",
  },
  {
    id: "11",
    brand: "Volkswagen",
    model: "Golf R",
    type: "Gasoline",
    price: 45665,
    weight: 1545,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1655125611386-35225917589e",
    description:
      "The king of hot hatches, combining all-wheel-drive grip with everyday practicality.",
  },
  {
    id: "12",
    brand: "Lexus",
    model: "RX 500h",
    type: "Hybrid",
    price: 63350,
    weight: 2155,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b",
    description:
      "A refined luxury SUV with a powerful hybrid powertrain and smooth ride.",
  },
  {
    id: "13",
    brand: "Mazda",
    model: "MX-5 Miata",
    type: "Gasoline",
    price: 28050,
    weight: 1061,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
    description:
      "A lightweight roadster that focuses purely on the joy of driving.",
  },
  {
    id: "14",
    brand: "Kia",
    model: "EV6",
    type: "Electric",
    price: 42600,
    weight: 2015,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1721178819979-7ca54a9ee7b5",
    description:
      "Bold styling and ultra-fast 800V charging make this a standout electric crossover.",
  },
  {
    id: "15",
    brand: "Volvo",
    model: "XC90 Recharge",
    type: "Hybrid",
    price: 71900,
    weight: 2290,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1597220457711-ba9917ed6c59",
    description:
      "A sophisticated three-row SUV emphasizing safety and sustainable Scandinavian design.",
  },
];

async function seed() {
  console.log("Starting SQL Seed...");

  // 1. Create Table if not exists
  await sql`
    CREATE TABLE IF NOT EXISTS cars (
      id TEXT PRIMARY KEY,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      type TEXT NOT NULL,
      price DECIMAL NOT NULL,
      weight INTEGER NOT NULL,
      rating DECIMAL NOT NULL,
      image_url TEXT NOT NULL,
      description TEXT
    );
  `;

  // 2. Clear and Insert Data
  await sql`DELETE FROM cars`;

  for (const car of CARS) {
    await sql`
      INSERT INTO cars (id, brand, model, type, price, weight, rating, image_url, description)
      VALUES (${car.id}, ${car.brand}, ${car.model}, ${car.type}, ${car.price}, ${car.weight}, ${car.rating}, ${car.image}, ${car.description})
    `;
  }

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
