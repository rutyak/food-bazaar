import { CartType } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [] as CartType[],
  reducers: {
    addOrder: (state, action: PayloadAction<CartType[]>) => {
      state.push(...action.payload);
    },
    clearOrders: () => {
      return [];
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
