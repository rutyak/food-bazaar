import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantType } from "@/types/restaurant";

interface UpdateRestauType {
  id: any;
  restaurant: RestaurantType;
}

interface DeleteRestauType {
  id: string;
}

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: [] as RestaurantType[],
  reducers: {
    addRestaurants: (state, action: PayloadAction<RestaurantType[]>) => {
      const newRestaurants = action.payload?.filter(
        (newRestau) => !state.some((existing) => existing._id === newRestau._id)
      );
      state.push(...newRestaurants);
    },
    updateRestaurant: (state, action: PayloadAction<UpdateRestauType>) => {
      const { id, restaurant } = action.payload;
      return state.map((restau) => (restau._id === id ? restaurant : restau));
    },
    deleteRestaurant: (state, action: PayloadAction<DeleteRestauType>) => {
      const { id } = action.payload;
      return state.filter((restau) => restau._id !== id);
    },
    removeCards: (state) => {
      return state.slice(0, 8);
    },
  },
});

export const {
  addRestaurants,
  updateRestaurant,
  deleteRestaurant,
  removeCards,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
