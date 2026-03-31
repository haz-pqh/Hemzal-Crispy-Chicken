
export interface Beverage {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  category: string;
  color: string;
  ingredients?: string[];
  nutritionalFacts?: {
    calories: string;
    sugar: string;
    fat: string;
  };
}

export interface CartItem {
  beverage: Beverage;
  quantity: number;
}
