import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "@/slice/menuSlice";

const store = configureStore({
  reducer: {
    menu: MenuReducer,
  },
});

export default store;
