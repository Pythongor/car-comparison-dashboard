import CarGrid from "./CarGrid";
import { getCars } from "@/lib/db/actions";

export default async function CarFeed({
  params,
}: {
  params: { brand?: string; sort?: string };
}) {
  const cars = await getCars(params);
  return <CarGrid cars={cars} />;
}
