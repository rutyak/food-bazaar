import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartItem {
//   id: string | number; // Use whatever type your ID is
//   quantity: number;
//   // Add any other properties that your cart items have
//   [key: string]: any; // This allows for additional properties
// }

interface CartState {
  cartItems: any[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<any>) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.cartItems[index].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCart: (state, action: PayloadAction<string | number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    increaseQuantity: (state, action: PayloadAction<string | number>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string | number>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );

      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
      }
    },
    clearAllCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addCart,
  removeCart,
  clearAllCart,
  decreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;