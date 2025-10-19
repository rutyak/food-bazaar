import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantType } from "@/types/restaurant";

interface updateRestauType {
  id: any;
  restaurant: RestaurantType;
}

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: [] as RestaurantType[],
  reducers: {
    setRestaurants: (state, action: PayloadAction<RestaurantType[]>) => {
      return action.payload;
    },
    updateRestaurant: (state, action: PayloadAction<updateRestauType>) => {
      const { id, restaurant } = action.payload;
      return state.map((restau) => (restau._id === id ? restaurant : restau));
    },
  },
});

export const { setRestaurants, updateRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
