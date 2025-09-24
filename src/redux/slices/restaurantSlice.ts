import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface restaurant {
  name: string;
  description: string;
  image: string;
  location: string;
  categories: string[];
  rating: number;
  priceForTwo: number;
}

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: [] as restaurant[],
  reducers: {
    setRestaurants: (state, action: PayloadAction<restaurant[]>) => {
      return action.payload;
    },
  },
});

export const { setRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;
