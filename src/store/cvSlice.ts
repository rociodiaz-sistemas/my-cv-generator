import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CV, Prompts } from "./types";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_PROMPTS } from "../helpers";

// Define the initial state for CVs
interface CVState {
  cvs: CV[];
  selectedCV: CV | null;
  formData: Omit<CV, "id" | "date">;
  prompts: Prompts;
}

const initialState: CVState = {
  cvs: JSON.parse(localStorage.getItem("cvs") || "[]"),
  selectedCV: null,
  formData: {
    title: "",
    introduction: "",
    web4Realty: "",
    glofy: "",
    weDevelop1: "",
    weDevelop2: "",
    cfotech: "",
    baufest1: "",
    baufest2: "",
    baufest3: "",
    streamCoder: "",
    skills: "",
  },
  prompts: DEFAULT_PROMPTS,
};

// Create the slice to handle CV-related actions
const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    addCV: (state) => {
      const newCV: CV = {
        ...state.formData,
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
      };
      state.cvs.push(newCV);
      localStorage.setItem("cvs", JSON.stringify(state.cvs));
    },

    updateFormData: (
      state,
      action: PayloadAction<{ field: keyof CVState["formData"]; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },

    clearFormData: (state) => {
      state.formData = {
        title: "",
        introduction: "",
        web4Realty: "",
        glofy: "",
        weDevelop1: "",
        weDevelop2: "",
        cfotech: "",
        baufest1: "",
        baufest2: "",
        baufest3: "",
        streamCoder: "",
        skills: "",
      };
    },

    deleteCV: (state, action: PayloadAction<string>) => {
      state.cvs = state.cvs.filter((cv) => cv.title !== action.payload); // Delete CV by title
      localStorage.setItem("cvs", JSON.stringify(state.cvs)); // Update localStorage
    },
    setCVs: (state, action: PayloadAction<CV[]>) => {
      state.cvs = action.payload; // Set all CVs (useful for initial state loading)
    },
    selectCV: (state, action: PayloadAction<string>) => {
      state.selectedCV =
        state.cvs.find((cv) => cv.id === action.payload) || null; // Select CV by ID
    },
    clearSelectedCV: (state) => {
      state.selectedCV = null; // Clear selected CV
    },
    setFormData: (state, action: PayloadAction<Partial<CV>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

// Export actions
export const {
  addCV,
  updateFormData,
  clearFormData,
  deleteCV,
  setCVs,
  selectCV,
  clearSelectedCV,
  setFormData,
} = cvSlice.actions;

// Export the reducer
export const CVReducer = cvSlice.reducer;
