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
    setRestaurants: (state, action: PayloadAction<RestaurantType[]>) => {
      return action.payload;
    },
    updateRestaurant: (state, action: PayloadAction<UpdateRestauType>) => {
      const { id, restaurant } = action.payload;
      return state.map((restau) => (restau._id === id ? restaurant : restau));
    },
    deleteRestaurant: (state, action: PayloadAction<DeleteRestauType>) => {
      const { id } = action.payload;
      return state.filter((restau) => restau._id !== id);
    },
  },
});

export const { setRestaurants, updateRestaurant, deleteRestaurant } =
  restaurantSlice.actions;
export default restaurantSlice.reducer;
