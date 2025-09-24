import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: [] as CartItem[],
  reducers: {
    setCarts: (state, action: PayloadAction<CartItem[]>) => {
      return action.payload;
    },
    addCart: (state, action: PayloadAction<CartItem>) => {
      state.push(action.payload);
    },
    removeCart: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.itemId !== action.payload);
    },
  },
});

export const { setCarts, addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
