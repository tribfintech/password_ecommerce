import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "./checkoutSlice"

export default configureStore({
  reducer: {
    checkout: checkoutReducer
  },
});
