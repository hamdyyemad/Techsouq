import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cardItems: [],
      shippingAddress: {},
      paymentMethod: "PayPal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const data = action.payload;
      let { product: item, qty } = data;
      if (!qty) qty = 1;
      const existItem = state.cardItems.find((i) => i._id === item._id);

      if (existItem) {
        state.cardItems = state.cardItems.map((i) =>
          i._id === existItem._id ? item : i
        );
      } else {
        state.cardItems = [...state.cardItems, item];
        // state.cardItems.push({ ...item, qty: qty + 1 });
      }

      return updateCart(state, item, qty);
    },
    removeFromCart: (state, action) => {
      const data = action.payload;
      const { product: item, qty } = data;
      const indexToRemove = state.cardItems.findIndex(
        (i) => i._id === item._id
      );
      if (indexToRemove !== -1) {
        state.cardItems.splice(indexToRemove, 1);
        state.qty = 0;
      }
      // state.cardItems = state.cardItems.filter((x) => x._id !== currentId);
      return updateCart(state, item, qty);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      return updateCart(state, null, 0);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state, null, 0);
    },
    clearCartItems: (state) => {
      state.cardItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    // eslint-disable-next-line no-unused-vars
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
