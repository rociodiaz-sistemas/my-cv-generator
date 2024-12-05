import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience, Skills } from "./types";

interface FormState {
  jobPosting: string;
  formTitle: string;
  formIntroduction: string;
  formSkills: Skills;
  formExperiences: Experience[];
  formJobTitle: string;
  isSpanish: boolean;
}

const initialState: FormState = {
  isSpanish: false,
  jobPosting: "",
  formJobTitle: "",
  formTitle: "",
  formIntroduction: "",
  formSkills: {
    soft: [],
    technical: [],
  },
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

      if (field === "formExperiences") {
        state.formExperiences = value as Experience[];
      }
    },

    setFormExperiences: (state, action: PayloadAction<Experience[]>) => {
      state.formExperiences = action.payload;
    },

    // Add a skill to the formSkills (soft or technical)
    addSkill: (
      state: FormState,
      action: PayloadAction<{ category: keyof Skills; skill: string }>
    ) => {
      const { category, skill } = action.payload;
      if (!state.formSkills[category].includes(skill)) {
        state.formSkills[category].push(skill);
      }
    },

    // Remove a skill from formSkills (soft or technical)
    removeSkill: (
      state: FormState,
      action: PayloadAction<{ category: keyof Skills; skill: string }>
    ) => {
      const { category, skill } = action.payload;
      state.formSkills[category] = state.formSkills[category].filter(
        (existingSkill) => existingSkill !== skill
      );
    },

    // Move a skill between categories in formSkills
    moveSkill: (
      state,
      action: PayloadAction<{
        from: "soft" | "technical";
        to: "soft" | "technical";
        skill: string;
      }>
    ) => {
      const { from, to, skill } = action.payload;
      if (state.formSkills[from].includes(skill)) {
        // Remove from the 'from' category
        state.formSkills[from] = state.formSkills[from].filter(
          (s) => s !== skill
        );

        // Add to the 'to' category if it's not already there
        if (!state.formSkills[to].includes(skill)) {
          state.formSkills[to].push(skill);
        }
      }
    },

    setSkills: (
      state: FormState,
      action: PayloadAction<{ category: keyof Skills; skills: string[] }>
    ) => {
      console.log(action.payload);
      const { category, skills } = action.payload;
      state.formSkills[category] = skills;
    },

    updateExperienceBulletpoints: (
      state,
      action: PayloadAction<{ id: number; bulletPoints: string[] }>
    ) => {
      const { id, bulletPoints } = action.payload;
      console.log(bulletPoints, "bulletPoints");
      const experience = state.formExperiences.find((exp) => exp.id === id);
      if (experience) {
        console.log("found");
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
    setIsSpanish: (state, action: PayloadAction<boolean>) => {
      state.isSpanish = action.payload;
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
  setIsSpanish,
} = formSlice.actions;

export const formReducer = formSlice.reducer;
