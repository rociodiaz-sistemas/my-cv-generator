import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isModalOpen: boolean;
  isFormSubmitted: boolean;
  activeStep: number;
  selectedExperiences: number[];
}

const initialState: UIState = {
  isModalOpen: false, // Initially, the modal is closed
  isFormSubmitted: false, // Form is not submitted initially
  activeStep: 0,
  selectedExperiences: [],
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
    // Navigation actions for stepper
    incrementStep: (state) => {
      state.activeStep += 1; // Go to the next step
    },
    decrementStep: (state) => {
      if (state.activeStep > 0) state.activeStep -= 1; // Go back a step
    },
    resetStep: (state) => {
      state.activeStep = 0; // Reset to the first step
    },
    setSelectedExperiences: (state, action: PayloadAction<number[]>) => {
      state.selectedExperiences = action.payload;
    },
  },
});

// Exporting actions
export const {
  openModal,
  closeModal,
  submitForm,
  resetForm,
  incrementStep,
  decrementStep,
  resetStep,
  setSelectedExperiences,
} = uiSlice.actions;

export const UIReducer = uiSlice.reducer;
