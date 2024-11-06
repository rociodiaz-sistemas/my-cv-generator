import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isModalOpen: boolean;
  isFormSubmitted: boolean;
}

const initialState: UIState = {
  isModalOpen: false, // Initially, the modal is closed
  isFormSubmitted: false, // Form is not submitted initially
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true; // Open the modal
    },
    closeModal: (state) => {
      state.isModalOpen = false; // Close the modal
    },
    submitForm: (state) => {
      state.isFormSubmitted = true; // Form is submitted
    },
    resetForm: (state) => {
      state.isFormSubmitted = false; // Reset form submission state
    },
  },
});

// Exporting actions
export const { openModal, closeModal, submitForm, resetForm } = uiSlice.actions;

export const UIReducer = uiSlice.reducer;
