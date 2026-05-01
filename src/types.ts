export interface Car {
  id: string;
  brand: string;
  model: string;
  type: string;
  price: number;
  weight: number;
  rating: number;
  image_url: string;
  description: string | null;
}

export interface FilterOptions {
  brands: string[];
  types: string[];
  ratings: number[];
}

export interface DataBounds {
  price: {
    min: number;
    max: number;
  };
  weight: {
    min: number;
    max: number;
  };
  rating: {
    min: number;
    max: number;
  };
}
