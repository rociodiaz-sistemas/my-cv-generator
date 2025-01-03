// cvSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CV, PreviewCV } from "./types";

interface CVState {
  cvs: CV[];
  selectedCV: CV | null;
  previewCV: PreviewCV;
}

const initialState: CVState = {
  cvs: [],
  selectedCV: null,
  previewCV: {
    isSpanish: false,
    jobTitle: "",
    introduction: "",
    skills: {
      soft: [],
      technical: [],
    },
    experiences: [],
  },
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    addCV: (state, action: PayloadAction<CV>) => {
      state.cvs.push(action.payload);
      localStorage.setItem("cvs", JSON.stringify(state.cvs));
    },
    deleteCV: (state, action: PayloadAction<string>) => {
      state.cvs = state.cvs.filter((cv) => cv.id !== action.payload);
      deleteCV(action.payload);
    },
    selectCV: (state, action: PayloadAction<string>) => {
      state.selectedCV =
        state.cvs.find((cv) => cv.id === action.payload) || null;
    },
    clearSelectedCV: (state) => {
      state.selectedCV = null;
    },
    setCVs: (state, action: PayloadAction<CV[]>) => {
      state.cvs = action.payload;
    },
    resetPreviewCV: (state) => {
      state.previewCV = {
        isSpanish: false,
        jobTitle: "",
        introduction: "",
        skills: {
          soft: [],
          technical: [],
        },
        experiences: [],
      };
    },
  },
});

export const { addCV, deleteCV, selectCV, clearSelectedCV, setCVs } =
  cvSlice.actions;

export const cvReducer = cvSlice.reducer;
