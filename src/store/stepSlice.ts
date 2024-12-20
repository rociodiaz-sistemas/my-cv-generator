import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepState {
  mainSteps: string[];
  steps: {
    [key: string]: string[]; // Each main step has an array of substeps
  };
  activeMainStep: string; // Current main step
  activeSubstepIndex: number; // Index of current substep in the active main step
}

const initialState: StepState = {
  mainSteps: ["setup", "experience", "overview"],
  steps: {
    setup: [
      "job posting",
      "details",
      "introduction",
      "experience checklist",
      "skills",
    ],
    experience: [], // To be dynamically populated
    overview: [], // No substeps
  },
  activeMainStep: "setup",
  activeSubstepIndex: 0,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    // Move to the next substep or main step
    nextStep: (state) => {
      const currentSubsteps = state.steps[state.activeMainStep];

      // If there are more substeps, go to the next one
      if (state.activeSubstepIndex < currentSubsteps.length - 1) {
        state.activeSubstepIndex += 1;
      }
      // If it's the last substep, move to the next main step
      else {
        const nextMainStepIndex =
          state.mainSteps.indexOf(state.activeMainStep) + 1;

        // Check if there's another main step
        if (nextMainStepIndex < state.mainSteps.length) {
          state.activeMainStep = state.mainSteps[nextMainStepIndex];
          state.activeSubstepIndex = 0;
        }
      }
    },

    // Move to the previous substep or main step
    previousStep: (state) => {
      if (state.activeSubstepIndex > 0) {
        state.activeSubstepIndex -= 1;
      } else {
        const prevMainStepIndex =
          state.mainSteps.indexOf(state.activeMainStep) - 1;
        if (prevMainStepIndex >= 0) {
          const previousMainStep = state.mainSteps[prevMainStepIndex];
          state.activeMainStep = previousMainStep;
          state.activeSubstepIndex = state.steps[previousMainStep].length - 1;
        }
      }
    },

    jumpToStep: (
      state,
      action: PayloadAction<{ mainStep: string; substepIndex?: number }>
    ) => {
      const { mainStep, substepIndex = 0 } = action.payload;

      // Validate the main step
      if (state.mainSteps.includes(mainStep)) {
        state.activeMainStep = mainStep;

        // Always reset to the first substep if moving to a new main step
        if (mainStep !== state.activeMainStep) {
          state.activeSubstepIndex = 0;
        } else {
          // Validate the substep index for the current main step
          const substeps = state.steps[mainStep];
          if (substepIndex >= 0 && substepIndex < substeps.length) {
            state.activeSubstepIndex = substepIndex;
          } else {
            state.activeSubstepIndex = 0;
          }
        }
      }
    },

    // Dynamically set experience steps based on user selections
    setExperienceSteps: (state, action: PayloadAction<string[]>) => {
      state.steps.experience = action.payload.map((exp, index) => `${exp}`);
    },

    // Set a specific active main step (e.g., for initial setup or debugging)
    setActiveMainStep: (state, action: PayloadAction<string>) => {
      if (state.mainSteps.includes(action.payload)) {
        state.activeMainStep = action.payload;
        state.activeSubstepIndex = 0; // Reset to first substep of the new main step
      }
    },

    // Directly set the active substep index
    setActiveSubstepIndex: (state, action: PayloadAction<number>) => {
      const currentSubsteps = state.steps[state.activeMainStep];
      if (action.payload >= 0 && action.payload < currentSubsteps.length) {
        state.activeSubstepIndex = action.payload;
      }
    },
    resetSteps: (state) => {
      state.activeMainStep = initialState.mainSteps[0]; // Reset to the first main step
      state.activeSubstepIndex = 0; // Reset substep index
      state.steps.experience = []; // Clear dynamic substeps, if needed
      state.steps.overview = []; // Clear overview substeps, if applicable
    },
  },
});

export const {
  nextStep,
  previousStep,
  setExperienceSteps,
  setActiveMainStep,
  setActiveSubstepIndex,
  resetSteps,
  jumpToStep,
} = stepSlice.actions;

export const stepReducer = stepSlice.reducer;
