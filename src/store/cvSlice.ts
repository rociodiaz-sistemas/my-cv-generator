// cvSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CV } from "./types";
import { v4 as uuidv4 } from "uuid";

interface CVState {
  cvs: CV[];
  selectedCV: CV | null;
}

const initialState: CVState = {
  cvs: JSON.parse(localStorage.getItem("cvs") || "[]"),
  selectedCV: null,
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    addCV: (state, action: PayloadAction<CV>) => {
      const newCV = {
        ...action.payload,
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
      };
      state.cvs.push(newCV);
      localStorage.setItem("cvs", JSON.stringify(state.cvs));
    },
    deleteCV: (state, action: PayloadAction<string>) => {
      state.cvs = state.cvs.filter((cv) => cv.id !== action.payload);
      localStorage.setItem("cvs", JSON.stringify(state.cvs));
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
  },
});

export const { addCV, deleteCV, selectCV, clearSelectedCV, setCVs } =
  cvSlice.actions;

export const cvReducer = cvSlice.reducer;
