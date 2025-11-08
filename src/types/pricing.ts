export interface Service {
  id: string;
  icon: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  services: Service[];
}

export interface PricingData {
  categories: Category[];
}
