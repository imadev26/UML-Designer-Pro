// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./editorSlice";

const store = configureStore({
  reducer: {
    editor: editorReducer,
  },
});

export default store;
