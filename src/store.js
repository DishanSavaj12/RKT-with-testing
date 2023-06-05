import { configureStore } from "@reduxjs/toolkit";
import apiUserSlice from "./redux/apiUerSlice";

const store = configureStore({
  reducer: {
    allUsersData: apiUserSlice
  },
});
export default store;
