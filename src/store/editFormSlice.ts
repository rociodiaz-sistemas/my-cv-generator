// cvSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CV } from "./types";
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

export const { setCV, editExperienceBulletpoints, addEditedCV, saveChanges } =
  EditFormSlice.actions;

export const editFormReducer = EditFormSlice.reducer;
