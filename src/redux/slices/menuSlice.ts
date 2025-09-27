import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuType } from "@/types/menu";

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
