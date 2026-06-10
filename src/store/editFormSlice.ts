// cvSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CV, Skills } from "./types";
import { v4 as uuidv4 } from "uuid";

interface EditFormState {
  CV: CV | undefined;
}

const initialState: EditFormState = {
  CV: undefined,
};

const EditFormSlice = createSlice({
  name: "editForm",
  initialState,
  reducers: {
    setCV: (state, action: PayloadAction<CV | undefined>) => {
      state.CV = action.payload;
    },
    updateCVField: (
      state,
      action: PayloadAction<{ field: keyof CV; value: string | boolean }>
    ) => {
      const { field, value } = action.payload;
      const stringValue = value as string;
      if (state.CV) {
        switch (field) {
          case "fullName":
            state.CV = { ...state.CV, fullName: stringValue };
            break;
          case "email":
            state.CV = { ...state.CV, email: stringValue };
            break;
          case "phone":
            state.CV = { ...state.CV, phone: stringValue };
            break;
          case "linkedin":
            state.CV = {
              ...state.CV,
              linkedin: stringValue,
              linkedinText: stringValue,
              linkedinUrl: stringValue,
            };
            break;
          case "linkedinText":
            state.CV = { ...state.CV, linkedinText: stringValue };
            break;
          case "linkedinUrl":
            state.CV = { ...state.CV, linkedinUrl: stringValue };
            break;
          case "website":
            state.CV = { ...state.CV, website: stringValue };
            break;
          case "location":
            state.CV = { ...state.CV, location: stringValue };
            break;
          case "showExperienceCount":
            state.CV = {
              ...state.CV,
              showExperienceCount: Boolean(value),
            };
            break;
          case "introduction":
            state.CV = { ...state.CV, introduction: stringValue };
            break;
          case "jobTitle":
            state.CV = { ...state.CV, jobTitle: stringValue };
            break;
          default:
            break;
        }
      }
    },
    setCVSkills: (
      state,
      action: PayloadAction<{ category: keyof Skills; skills: string[] }>
    ) => {
      if (state.CV) {
        state.CV = {
          ...state.CV,
          skills: {
            ...state.CV.skills,
            [action.payload.category]: action.payload.skills,
          },
        };
      }
    },
    addCVSkill: (
      state,
      action: PayloadAction<{ category: keyof Skills; skill: string }>
    ) => {
      if (
        state.CV &&
        !state.CV.skills[action.payload.category].includes(
          action.payload.skill
        )
      ) {
        const nextSkills = {
          ...state.CV.skills,
          [action.payload.category]: [
            ...state.CV.skills[action.payload.category],
            action.payload.skill,
          ],
        };
        state.CV = { ...state.CV, skills: nextSkills };
      }
    },
    removeCVSkill: (
      state,
      action: PayloadAction<{ category: keyof Skills; skill: string }>
    ) => {
      if (state.CV) {
        state.CV = {
          ...state.CV,
          skills: {
            ...state.CV.skills,
            [action.payload.category]: state.CV.skills[
              action.payload.category
            ].filter((item) => item !== action.payload.skill),
          },
        };
      }
    },
    editExperienceBulletpoints: (
      state,
      action: PayloadAction<{ id: number; bulletPoints: string[] }>
    ) => {
      const { id, bulletPoints } = action.payload;
      if (state.CV) {
        const nextExperiences = state.CV.experiences.map((experience) =>
          experience.id === id ? { ...experience, bulletPoints } : experience
        );
        state.CV = { ...state.CV, experiences: nextExperiences };
      }
    },
    saveChanges: (state) => {
      const allCVs = localStorage.getItem("cvs");
      if (allCVs) {
        const cvs = JSON.parse(allCVs);
        const updatedCVs = cvs.map((cv: CV) => {
          if (cv.id === state.CV?.id) {
            return state.CV;
          }
          return cv;
        });
        localStorage.setItem("cvs", JSON.stringify(updatedCVs));
      }
    },
    addEditedCV: (state) => {
      const allCVs = localStorage.getItem("cvs");
      if (allCVs) {
        const cvs = JSON.parse(allCVs);
        if (state.CV) {
          state.CV.cvPDFName = `${state.CV.cvPDFName}-copy`;
          state.CV.id = uuidv4();
          state.CV.title = `${state.CV.title} - Copy`;
        }
        cvs.push(state.CV);
        console.log(cvs);
        localStorage.setItem("cvs", JSON.stringify(cvs));
      }
    },
  },
});

export const {
  setCV,
  editExperienceBulletpoints,
  addEditedCV,
  saveChanges,
  setCVSkills,
  addCVSkill,
  removeCVSkill,
} = EditFormSlice.actions;

export const editFormReducer = EditFormSlice.reducer;
