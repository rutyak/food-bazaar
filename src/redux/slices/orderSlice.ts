import { CartType } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: [] as CartType[],
  reducers: {
    addOrder: (state, action: PayloadAction<CartType[]>) => {
      return action.payload;
    },
    clearOrders: () => {
      return [];
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;
