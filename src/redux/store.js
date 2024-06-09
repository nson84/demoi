import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter/counterSlice";
import acccountReducer from "../redux/account/accountSlide";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: acccountReducer,
  },
});
