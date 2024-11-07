import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CV } from "./types";
import { v4 as uuidv4 } from "uuid";

// Define the initial state for CVs
interface CVState {
  cvs: CV[];
  selectedCV: CV | null;
}

const initialState: CVState = {
  cvs: JSON.parse(localStorage.getItem("cvs") || "[]"),
  selectedCV: null,
};

// Create the slice to handle CV-related actions
const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    addCV: (state, action: PayloadAction<Omit<CV, "id">>) => {
      const newCV = { ...action.payload, id: uuidv4() }; // Generate unique ID for each new CV
      state.cvs.push(newCV);
      localStorage.setItem("cvs", JSON.stringify(state.cvs));
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
  },
});

// Export actions
export const { addCV, deleteCV, setCVs, selectCV } = cvSlice.actions;

// Export the reducer
export const CVReducer = cvSlice.reducer;
