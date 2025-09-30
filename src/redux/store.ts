import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import restaurantReducer from "./slices/restaurantSlice";
import menuReducer from "./slices/menuSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

interface MenuType {
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating: number;
}

interface Restaurant {
  name: string;
  description: string;
  image: string;
  location: string;
  categories: string[];
  rating: number;
  priceForTwo: number;
}

export interface RootReducerState {
  restaurants: Restaurant[];
  menu: MenuType[];
}

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  restaurants: restaurantReducer,
  menu: menuReducer,
  cart: cartReducer,
  order: orderReducer,
});

// Use type assertion to fix the TypeScript error
const persistedReducer = (
  typeof window !== "undefined"
    ? persistReducer(persistConfig, rootReducer)
    : rootReducer
) as typeof rootReducer;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor =
  typeof window !== "undefined" ? persistStore(store) : null;

export default store;
