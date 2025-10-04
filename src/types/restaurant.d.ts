export interface RestaurantType {
  _id?: string;
  name: string;
  description: string;
  image: string;
  location: string;
  categories: string[];
  rating: number;
  pricefortwo: number;
  veg: boolean;
  deliveryTime: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
