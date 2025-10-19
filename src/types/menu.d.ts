interface RestaurantType {
  categories: string[];
  image: string;
  location: string;
  name: string;
  rating: number;
  pricefortwo: number;
}

export interface CategoryType {
  category: string;
  items: ItemsType[];
}

export interface ItemsType {
  _id: string;
  category?: string;
  categories?: CategoryType;
  description: string;
  image: string;
  isVeg: boolean;
  name: string;
  price: number;
  rating: number;
  restaurant: RestaurantType;
  restaurantId: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}


export interface MenuType {
  _id?: string;
  restaurant: RestaurantType;
  categories: CategoryType[];
  restaurantId: string;
}
