import { configureStore } from "@reduxjs/toolkit";
import { UIReducer } from "./UiSlice";

export const store = configureStore({
  reducer: {
    ui: UIReducer, // This will hold our modal and form submission states
  },
});

// TypeScript types for Redux store state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
