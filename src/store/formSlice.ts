import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience } from "./types";

interface FormState {
  jobPosting: string;
  title: string;
  introduction: string;
  skills: string[];
  formExperiences: Experience[];
}

const initialState: FormState = {
  jobPosting: "",
  title: "",
  introduction: "",
  skills: [],
  formExperiences: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Update field dynamically, but with type safety
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof FormState;
        value: string | string[] | Experience[];
      }>
    ) => {
      const { field, value } = action.payload;
      if (Array.isArray(value)) {
        if (field === "skills") {
          state.skills = value as string[]; // Skills should be a string array
        } else if (field === "formExperiences") {
          state.formExperiences = value as Experience[]; // Experiences should be an array of Experience objects
        }
      } else {
        if (field === "title") {
          state.title = value as string; // Title is a string
        } else if (field === "introduction") {
          state.introduction = value as string; // Introduction is a string
        } else if (field === "jobPosting") {
          state.jobPosting = value as string;
        }
      }
    },

    // Explicit Setters for Complex Fields (if needed)
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    setExperiences: (state, action: PayloadAction<Experience[]>) => {
      state.formExperiences = action.payload;
    },
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
    clearForm: () => initialState,
  },
});

export const {
  updateField,
  setSkills,
  setExperiences,
  addSkill,
  removeSkill,
  addExperience,
  removeExperience,
  clearForm,
} = formSlice.actions;

export const formReducer = formSlice.reducer;
