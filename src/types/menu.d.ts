interface RestaurantType {
  categories: string[];
  image: string;
  location: string;
  name: string;
  rating: number;
  pricefortwo: number;
}

export interface ItemsType {
  _id: string;
  category: string;
  description: string;
  image: string;
  isVeg: boolean;
  name: string;
  price: number;
  rating: number;
  restaurant: RestaurantType;
  restaurantId: string;
}

export interface CategoryType {
  category: string;
  items: ItemsType[];
}

export interface MenuType {
  _id?: string;
  restaurant: RestaurantType;
  categories: CategoryType[];
  restaurantId: string;
}
