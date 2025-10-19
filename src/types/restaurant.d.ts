export interface RestaurantType {
  _id?: string;
  name?: string;
  description?: string;
  image?: string | null;
  location?: string;
  categories?: string[];
  rating?: number;
  pricefortwo?: number | undefined;
  veg?: boolean;
  deliveryTime?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
