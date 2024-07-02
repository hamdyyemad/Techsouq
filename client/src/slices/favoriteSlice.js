// favoriteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : { favoriteItems: [] };

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const item = action.payload;
      if (!state.favoriteItems.find((i) => i._id === item._id)) {
        state.favoriteItems.push(item);
      }
      localStorage.setItem("favorites", JSON.stringify(state));
    },
    removeFromFavorites: (state, action) => {
      const item = action.payload;
      state.favoriteItems = state.favoriteItems.filter(
        (i) => i._id !== item._id
      );
      localStorage.setItem("favorites", JSON.stringify(state));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
