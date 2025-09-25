import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyCaaRecord } from "dns";

interface CartItem {
  _id?: string;
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
      const existingItem = state.find(
        (item) => item.itemId === action.payload.itemId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push(action.payload);
      }
    },
    removeCart: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.itemId !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.find((item) => item.itemId === action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.find((item) => item.itemId === action.payload);
      if (existingItem) {
        existingItem.quantity -= 1;
      }
    },
  },
});

export const {
  setCarts,
  addCart,
  removeCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
