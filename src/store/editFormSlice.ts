// cvSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CV } from "./types";

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
      action: PayloadAction<{ field: keyof CV; value: string }>
    ) => {
      const { field, value } = action.payload;
      if (state.CV) {
        switch (field) {
          case "introduction":
            state.CV.introduction = value;
            break;
          case "jobTitle":
            state.CV.jobTitle = value;
            break;
          default:
            break;
        }
      }
    },
    editExperienceBulletpoints: (
      state,
      action: PayloadAction<{ id: number; bulletPoints: string[] }>
    ) => {
      const { id, bulletPoints } = action.payload;
      const experience = state.CV?.experiences.find((exp) => exp.id === id);
      if (experience) {
        experience.bulletPoints = bulletPoints;
      }
    },
  },
});

export const { setCV, editExperienceBulletpoints } = EditFormSlice.actions;

export const editFormReducer = EditFormSlice.reducer;
