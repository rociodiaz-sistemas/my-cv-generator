import { configureStore } from "@reduxjs/toolkit";
import { UIReducer } from "./uiSlice";
import { profileReducer } from "./profileSlice";
import { cvReducer } from "./cvSlice";
import { formReducer } from "./formSlice";
import { stepReducer } from "./stepSlice";

export const store = configureStore({
  reducer: {
    ui: UIReducer, // This will hold our modal and form submission states
    cv: cvReducer, // This will hold our CV data
    profile: profileReducer, // This will hold our profile data
    formData: formReducer,
    step: stepReducer,
  },
});

// TypeScript types for Redux store state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
