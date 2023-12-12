import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/userSlice.js";
import folderReducer from "./redux/user/folderSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    folder: folderReducer,
  },
});
