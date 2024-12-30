// cvSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CV, PreviewCV } from "./types";
import { db } from "../db/CVDatabase";
import { v4 as uuidv4 } from "uuid";
import { updateCV, addCV as addCVToDB } from "../db/CVOperations";

interface CVState {
  cvs: CV[];
  selectedCV: CV | null;
  previewCV: PreviewCV;
  status: "idle" | "loading" | "failed"; // For tracking async state
  error: string | null;
}

// Refactor saveCVChanges to take cv directly as a parameter
export const saveCVChanges = createAsyncThunk(
  "cv/saveCVChanges",
  async (cv: CV, { rejectWithValue, dispatch }) => {
    if (!cv) {
      return rejectWithValue("No CV found");
    }

    try {
      await updateCV(cv.id, { ...cv });
      dispatch(fetchCVs()); // Trigger refetch after update
      return cv;
    } catch (error) {
      return rejectWithValue("Error saving CV");
    }
  }
);

// Refactor addNewCV to take cv directly and create a new copy
export const addNewCV = createAsyncThunk(
  "cv/addNewCV",
  async (cv: CV, { rejectWithValue, dispatch }) => {
    if (!cv) {
      return rejectWithValue("No CV found to copy");
    }

    try {
      const newCV = { ...cv, id: uuidv4(), title: `${cv.title} - Copy` };
      await addCVToDB(newCV);
      dispatch(fetchCVs()); // Trigger refetch after adding
      return newCV;
    } catch (error) {
      return rejectWithValue("Error adding new CV");
    }
  }
);

export const deleteCV = createAsyncThunk(
  "cv/deleteCV",
  async (cvId: string, { rejectWithValue, dispatch }) => {
    try {
      await db.cvs.delete(cvId);
      dispatch(fetchCVs()); // Trigger refetch after delete
      return cvId;
    } catch (error) {
      return rejectWithValue("Error deleting CV");
    }
  }
);

// Define the fetchCVs action
export const fetchCVs = createAsyncThunk("cv/fetchCVs", async () => {
  try {
    return await db.cvs.toArray();
  } catch (error) {
    console.error("Error fetching CVs:", error);
    return [];
  }
});

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
  status: "idle",
  error: null,
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    addCV: (state, action: PayloadAction<CV>) => {
      state.cvs.push(action.payload);
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
  extraReducers: (builder) => {
    builder
      .addCase(saveCVChanges.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveCVChanges.fulfilled, (state, action) => {
        state.status = "idle";
        // Directly set the updated CV
        state.selectedCV = action.payload;
      })
      .addCase(saveCVChanges.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addNewCV.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewCV.fulfilled, (state, action) => {
        state.status = "idle";
        // Optionally, add the new CV to the list
        state.cvs.push(action.payload);
      })
      .addCase(addNewCV.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { addCV, selectCV, clearSelectedCV, setCVs } = cvSlice.actions;

export const cvReducer = cvSlice.reducer;
