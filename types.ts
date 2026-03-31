
export interface Chicken {
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
    protein: string;
    fat: string;
  };
}

export interface CartItem {
  chicken: Chicken;
  quantity: number;
}
