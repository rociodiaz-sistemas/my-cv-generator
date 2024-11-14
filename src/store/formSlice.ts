import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience } from "./types";

interface FormState {
  jobPosting: string;
  title: string;
  introduction: string;
  skills: string[];
  formExperiences: Experience[];
  jobTitle: string;
}

const initialState: FormState = {
  jobPosting: "",
  jobTitle: "",
  title: "",
  introduction: "",
  skills: [],
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
        case "title":
          state.title = value;
          break;
        case "introduction":
          state.introduction = value;
          break;
        case "jobPosting":
          state.jobPosting = value;
          break;
        case "jobTitle":
          state.jobTitle = value;
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
        state.skills = value as string[];
      } else if (field === "formExperiences") {
        state.formExperiences = value as Experience[];
      }
    },

    // Setters for specific fields
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    setExperiences: (state, action: PayloadAction<Experience[]>) => {
      state.formExperiences = action.payload;
    },

    // Adding/removing items from array fields
    addSkill: (state, action: PayloadAction<string>) => {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload);
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((skill) => skill !== action.payload);
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
  setExperiences,
  addSkill,
  removeSkill,
  addExperience,
  removeExperience,
  clearForm,
} = formSlice.actions;

export const formReducer = formSlice.reducer;
