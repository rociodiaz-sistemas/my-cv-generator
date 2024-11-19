// cvSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CV, CVFormData, PreviewCV } from "./types";
import { v4 as uuidv4 } from "uuid";

interface CVState {
  cvs: CV[];
  selectedCV: CV | null;
  previewCV: PreviewCV;
}

const initialState: CVState = {
  cvs: JSON.parse(localStorage.getItem("cvs") || "[]"),
  selectedCV: null,
  previewCV: {
    jobTitle: "",
    introduction: "",
    skills: [],
    experiences: [],
  },
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    addCV: (state, action: PayloadAction<CVFormData>) => {
      const newCV = {
        ...action.payload,
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
        cvPDFName: `${action.payload.title.replace(/\s+/g, "-")}`,
      };
      state.cvs.push(newCV);
      localStorage.setItem("cvs", JSON.stringify(state.cvs));
    },
    deleteCV: (state, action: PayloadAction<string>) => {
      state.cvs = state.cvs.filter((cv) => cv.id === action.payload);
      localStorage.setItem("cvs", JSON.stringify(state.cvs));
    },
    selectCV: (state, action: PayloadAction<string>) => {
      console.log(state.cvs.find((cv) => cv.id === action.payload));
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
        jobTitle: "",
        introduction: "",
        skills: [],
        experiences: [],
      };
    },
  },
});

export const { addCV, deleteCV, selectCV, clearSelectedCV, setCVs } =
  cvSlice.actions;

export const cvReducer = cvSlice.reducer;
