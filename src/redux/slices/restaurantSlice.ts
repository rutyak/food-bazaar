import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantType } from "@/types/restaurant";

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: [] as RestaurantType[],
  reducers: {
    setRestaurants: (state, action: PayloadAction<RestaurantType[]>) => {
      return action.payload;
    },
  },
});

export const { setRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;
