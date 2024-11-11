import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Experience } from "./types";

// Define state for suggestions
interface SuggestionsState {
  skillsSuggestions: string[];
  experiencesSuggestions: Experience[];
  titleSuggestions: string[];
  loading: boolean;
  error: string | null;
}

const initialState: SuggestionsState = {
  skillsSuggestions: ["ReactJS", "NodeJS", "TypeScript"],
  experiencesSuggestions: [],
  titleSuggestions: [],
  loading: false,
  error: null,
};

// Async thunk to fetch suggestions (based on profile and job posting)
export const fetchSkillsSuggestions = createAsyncThunk(
  "suggestions/fetchSkillsSuggestions",
  async (jobPosting: string, { rejectWithValue }) => {
    try {
      // Replace with real API call to fetch suggested skills
      const response = await fetch(
        `/api/ai-suggestions/skills?jobPosting=${encodeURIComponent(
          jobPosting
        )}`
      );
      const data = await response.json();
      return data.suggestions; // Assuming API returns an array of skills
    } catch (error) {
      return rejectWithValue("Failed to fetch skill suggestions");
    }
  }
);

export const fetchExperiencesSuggestions = createAsyncThunk(
  "suggestions/fetchExperiencesSuggestions",
  async (profileSkills: string[], { rejectWithValue }) => {
    try {
      // Replace with real API call to fetch suggested experiences
      const response = await fetch(
        `/api/ai-suggestions/experiences?profileSkills=${encodeURIComponent(
          profileSkills.join(",")
        )}`
      );
      const data = await response.json();
      return data.suggestions; // Assuming API returns an array of experiences
    } catch (error) {
      return rejectWithValue("Failed to fetch experience suggestions");
    }
  }
);

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    clearSuggestions: (state) => {
      state.skillsSuggestions = [];
      state.experiencesSuggestions = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillsSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSkillsSuggestions.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.loading = false;
          state.skillsSuggestions = action.payload;
        }
      )
      .addCase(fetchSkillsSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchExperiencesSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchExperiencesSuggestions.fulfilled,
        (state, action: PayloadAction<Experience[]>) => {
          state.loading = false;
          state.experiencesSuggestions = action.payload;
        }
      )
      .addCase(fetchExperiencesSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSuggestions } = suggestionsSlice.actions;

export const suggestionsReducer = suggestionsSlice.reducer;
