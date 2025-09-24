import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyCaaRecord } from "dns";

interface CartItem {
  _id: string;
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
      const existingItem = state.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    removeCart: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const { setCarts, addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
