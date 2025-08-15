type Product = {
  colors: any;
  base_price: any;
  id: string;
  name: string;
  price: number;
  image: any;
  fav: boolean;
};

export type ProductCardProps = {
  item: Product;
  favOnpress?: () => void;
  crtOnpress?: () => void;
  isLoading?: boolean;
};
