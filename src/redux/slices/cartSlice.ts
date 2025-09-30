import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType } from "@/types/cart";

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartType[],
  reducers: {
    setCarts: (state, action: PayloadAction<CartType[]>) => {
      return action.payload;
    },
    addCart: (state, action: PayloadAction<CartType>) => {
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
    removeAllCart: () => {
      return [];
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
  removeAllCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
