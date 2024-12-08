import { configureStore } from "@reduxjs/toolkit";
import movieoReducer from "../store/movieSlice";
export const store = configureStore({
  reducer: {
    movie: movieoReducer,
  },
});
