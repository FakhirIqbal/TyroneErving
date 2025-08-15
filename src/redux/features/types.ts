export interface Product {
  id: string;
  name: string;
  description: string | null;
  base_price: number;
  avg_rating: number;
  colors: string[];
  sizes: string[];
  for_gender: string;
  is_trending: boolean;
  prescription: string | null;
  created_at: string;
  quantity: number;
}
