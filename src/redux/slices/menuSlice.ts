import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType, ItemsType, MenuType } from "@/types/menu";

interface UpdateMenuType {
  id: string;
  restaurantId: string;
  category: string;
  menuItem: ItemsType;
}

interface DeleteMenuType {
  id: string;
  restaurantId: string;
  category: string;
}

const menuSlice = createSlice({
  name: "menu",
  initialState: [] as MenuType[],
  reducers: {
    setMenu: (state, action: PayloadAction<MenuType[]>) => {
      return action.payload;
    },
    updateMenu: (state, action: PayloadAction<UpdateMenuType>) => {
      const { id, restaurantId, category, menuItem } = action.payload;

      const restaurant = state?.find(
        (restau) => restau?.restaurantId === restaurantId
      );
      if (!restaurant) return;

      const cat = restaurant?.categories?.find(
        (cat) => cat.category === category
      );
      if (!cat) return;

      const itemIndex = cat?.items?.findIndex((item) => item._id === id);

      if (itemIndex !== -1) {
        cat.items[itemIndex as any] = menuItem;
      }
    },
    deleteMenu: (state, action: PayloadAction<DeleteMenuType>) => {
      const { id, restaurantId, category } = action.payload;

      const restaurant = state?.find(
        (restau) => restau?.restaurantId === restaurantId
      );
      if (!restaurant) return;

      const cat = restaurant?.categories?.find(
        (cat) => cat.category === category
      );
      if (!cat) return;

      cat.items = cat?.items?.filter((item) => item._id !== id);
    },
  },
});

export const { setMenu, updateMenu, deleteMenu } = menuSlice.actions;
export default menuSlice.reducer;
