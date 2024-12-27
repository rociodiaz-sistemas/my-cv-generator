import { configureStore } from "@reduxjs/toolkit";
import { UIReducer } from "./uiSlice";
import { profileReducer } from "./profileSlice";
import { cvReducer } from "./cvSlice";
import { formReducer } from "./formSlice";
import { stepReducer } from "./stepSlice";
import { suggestionsReducer } from "./suggestionsSlice";
import { editFormReducer } from "./editFormSlice";

export const store = configureStore({
  reducer: {
    ui: UIReducer, // This will hold our modal and form submission states
    cv: cvReducer, // This will hold our CV data
    profile: profileReducer, // This will hold our profile data
    formData: formReducer, // This will hold our form data
    step: stepReducer, // This will hold our step data
    suggestions: suggestionsReducer, // This will hold our suggestions data
    EditForm: editFormReducer,
  },
});

// TypeScript types for Redux store state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
