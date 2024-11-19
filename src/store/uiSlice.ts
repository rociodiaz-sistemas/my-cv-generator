import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { resetSteps, setExperienceSteps } from "./stepSlice";
import { CV, CVFormData, Experience, PreviewCV } from "./types";
import { clearForm, setFormExperiences } from "./formSlice";
import { addCV } from "./cvSlice";
import { createCV } from "../helpers";

interface UIState {
  isModalOpen: boolean;
  isFormSubmitted: boolean;
  activeStep: number;
  selectedExperiences: number[];
  isHelperExpanded: boolean;
}

const initialState: UIState = {
  isModalOpen: false, // Initially, the modal is closed
  isFormSubmitted: false, // Form is not submitted initially
  activeStep: 0,
  selectedExperiences: [],
  isHelperExpanded: false,
};

export const setExperiencesAndSteps = createAsyncThunk<
  void,
  Experience[],
  { state: RootState }
>(
  "experience/setExperiencesAndSteps",
  async (selectedExperiences, { dispatch }) => {
    // Dispatch the first action to update selected experiences
    dispatch(setSelectedExperiences(selectedExperiences.map((exp) => exp.id)));
    // Generate experience steps based on selected experience IDs
    const experienceSteps = selectedExperiences.map(
      (experience) => `${experience.company}`
    );

    dispatch(setFormExperiences(selectedExperiences));

    // Dispatch the second action to update the steps
    dispatch(setExperienceSteps(experienceSteps));
  }
);

export const submitForm = createAsyncThunk<CV, void, { state: RootState }>(
  "form/submitForm",
  async (_, { dispatch, getState }) => {
    const state = getState(); // Access the entire Redux state

    // Extract the form state from the formSlice
    const formState = state.formData;

    // Construct the CV data from the form state
    const cvData = {
      jobTitle: formState.formJobTitle,
      introduction: formState.formIntroduction,
      skills: formState.formSkills,
      experiences: formState.formExperiences,
      title: formState.formTitle,
    };

    const newCV = createCV(cvData);

    dispatch(addCV(newCV));
    dispatch(resetSteps());
    dispatch(clearForm());
    dispatch(closeModal());
    return newCV;
  }
);

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
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    setIsHelperExpanded: (state, action: PayloadAction<boolean>) => {
      state.isHelperExpanded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setExperiencesAndSteps.fulfilled, (state) => {});
    builder.addCase(submitForm.fulfilled, (state) => {
      state.isFormSubmitted = true;
    });
  },
});

// Exporting actions
export const {
  openModal,
  closeModal,
  resetForm,
  incrementStep,
  decrementStep,
  resetStep,
  setSelectedExperiences,
  setActiveStep,
  setIsHelperExpanded,
} = uiSlice.actions;

export const UIReducer = uiSlice.reducer;
