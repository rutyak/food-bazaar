import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RestaurantType {
  categories: string[];
  image: string;
  location: string;
  name: string;
  rating: number;
  pricefortwo: number;
}
interface ItemsType {
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
interface CategoryType {
  category: string;
  items: ItemsType[];
}
interface MenuType {
  _id?: string;
  restaurant: RestaurantType;
  categories: CategoryType[];
  restaurantId: string;
}

const menuSlice = createSlice({
  name: "menu",
  initialState: [] as MenuType[],
  reducers: {
    setMenu: (state, action: PayloadAction<MenuType[]>) => {
      return action.payload;
    },
  },
});

export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;
