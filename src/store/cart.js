import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemInCart = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload.id || item.size !== action.payload.size || item.color !== action.payload.color);
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const isItemInCart = (state, itemId) =>
  state.cart.items.some((item) => item.id === itemId);

const cartReducer = cartSlice.reducer;
export default cartReducer;
