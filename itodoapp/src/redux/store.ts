/** @format */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

const rootReducer = combineReducers({
  todos: todoSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
