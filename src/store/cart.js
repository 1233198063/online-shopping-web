import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  notification: {
    show: false,
    message: '',
    severity: 'success',
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemInCart = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.notification = {
        show: true,
        message: 'Item added to basket',
        severity: 'success',
      };
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.size !== action.payload.size ||
          item.color !== action.payload.color
      );

      state.notification = {
        show: true,
        message: 'Item removed from basket',
        severity: 'warning',
      };
    },
    hideNotification: (state) => {
      state.notification.show = false;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, hideNotification } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const isItemInCart = (state, itemId) =>
  state.cart.items.some((item) => item.id === itemId);
export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectNotification = (state) => state.cart.notification;

const cartReducer = cartSlice.reducer;
export default cartReducer;
