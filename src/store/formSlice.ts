import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience } from "./types";

interface FormState {
  jobPosting: string;
  formTitle: string;
  formIntroduction: string;
  formSkills: string[];
  formExperiences: Experience[];
  formJobTitle: string;
}

const initialState: FormState = {
  jobPosting: "",
  formJobTitle: "",
  formTitle: "",
  formIntroduction: "",
  formSkills: [],
  formExperiences: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Update string fields
    updateStringField: (
      state,
      action: PayloadAction<{ field: keyof FormState; value: string }>
    ) => {
      const { field, value } = action.payload;
      switch (field) {
        case "formTitle":
          state.formTitle = value;
          break;
        case "formIntroduction":
          state.formIntroduction = value;
          break;
        case "jobPosting":
          state.jobPosting = value;
          break;
        case "formJobTitle":
          state.formJobTitle = value;
          break;
        default:
          break;
      }
    },

    // Update array fields (skills, experiences, KeyAttributes)
    updateArrayField: (
      state,
      action: PayloadAction<{ field: string; value: string[] | Experience[] }>
    ) => {
      const { field, value } = action.payload;
      if (field === "skills") {
        state.formSkills = value as string[];
      } else if (field === "formExperiences") {
        state.formExperiences = value as Experience[];
      }
    },

    // Setters for specific fields
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.formSkills = action.payload;
    },
    setFormExperiences: (state, action: PayloadAction<Experience[]>) => {
      state.formExperiences = action.payload;
    },

    // Adding/removing items from array fields
    addSkill: (state, action: PayloadAction<string>) => {
      if (!state.formSkills.includes(action.payload)) {
        state.formSkills.push(action.payload);
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.formSkills = state.formSkills.filter(
        (skill) => skill !== action.payload
      );
    },
    updateExperienceBulletpoints: (
      state,
      action: PayloadAction<{ id: number; bulletPoints: string[] }>
    ) => {
      const { id, bulletPoints } = action.payload;
      const experience = state.formExperiences.find((exp) => exp.id === id);

      if (experience) {
        experience.bulletPoints = bulletPoints;
      }
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.formExperiences.push(action.payload);
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      state.formExperiences = state.formExperiences.filter(
        (exp) => exp.id !== action.payload
      );
    },
    // Clear form (reset to initial state)
    clearForm: () => initialState,
  },
});

export const {
  updateStringField,
  updateArrayField,
  setSkills,
  addSkill,
  removeSkill,
  addExperience,
  removeExperience,
  clearForm,
  setFormExperiences,
  updateExperienceBulletpoints,
} = formSlice.actions;

export const formReducer = formSlice.reducer;
