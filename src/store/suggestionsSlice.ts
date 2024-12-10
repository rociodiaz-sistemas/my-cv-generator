import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ReccomendedExperience,
  KeyAttributes,
  ExperienceSuggestions,
} from "./types";
import { capitalizeWords } from "../helpers";

interface SuggestionsState {
  experienceSuggestions: ExperienceSuggestions[];
  loading: boolean;
  error: string | null;
  KeyAttributes: KeyAttributes;
  company: string;
  jobTitleSuggestion: string;
  introductionSuggestions: string[] | undefined;
  jobPostingTips: string;
  currentKnownFor: string[];
  formattedJobPosting: string;
  toneOfJobPosting: string;
  matchTone: boolean;
  recommendedExperiences: ReccomendedExperience[];
  qualifications: string[];
}

const initialState: SuggestionsState = {
  jobPostingTips: "",
  toneOfJobPosting: "",
  company: "",
  jobTitleSuggestion: "",
  experienceSuggestions: [],
  introductionSuggestions: [],
  loading: false,
  error: null,
  formattedJobPosting: "",
  currentKnownFor: [],
  recommendedExperiences: [],
  matchTone: false,
  KeyAttributes: {
    technicalSkills: [],
    concepts: [],
    interpersonalSkills: [],
  },
  qualifications: [],
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
    setSetupData: (state, action: PayloadAction<SuggestionsState>) => {
      const {
        company,
        jobTitleSuggestion,
        toneOfJobPosting,
        jobPostingTips,
        KeyAttributes,
        qualifications,
      } = action.payload;
      state.company = company || "";
      state.jobTitleSuggestion = jobTitleSuggestion || "";
      state.toneOfJobPosting = toneOfJobPosting || "";
      state.jobPostingTips = jobPostingTips || "";
      state.KeyAttributes = KeyAttributes || {
        technicalSkills: [],
        concepts: [],
        interpersonalSkills: [],
      };
      state.KeyAttributes.technicalSkills =
        state.KeyAttributes.technicalSkills.map(capitalizeWords);

      state.KeyAttributes.concepts =
        state.KeyAttributes.concepts.map(capitalizeWords);

      state.KeyAttributes.interpersonalSkills =
        state.KeyAttributes.interpersonalSkills.map(capitalizeWords);
      state.qualifications = qualifications || [];
    },
    setIntroductionSuggestions: (state, action: PayloadAction<string[]>) => {
      state.introductionSuggestions = action.payload;
    },

    setRecommendedExperiences: (
      state,
      action: PayloadAction<ReccomendedExperience[]>
    ) => {
      state.recommendedExperiences = action.payload;
    },

    clearSuggestions: (state) => {
      state.experienceSuggestions = [];
      state.loading = false;
      state.error = null;
    },
    addCurrentKnownFor: (state, action: PayloadAction<string>) => {
      // Prevent duplicates
      if (!state.currentKnownFor.includes(action.payload)) {
        state.currentKnownFor.push(action.payload);
      }
    },

    addSuggestionsByExperienceId: (
      state,
      action: PayloadAction<{ id: number; suggestions: string[] }>
    ) => {
      const { id, suggestions } = action.payload;

      // Check if the experience ID already exists in the suggestions list
      const existingIndex = state.experienceSuggestions.findIndex(
        (item) => item.id === id
      );

      if (existingIndex !== -1) {
        // Update the existing entry with new suggestions
        state.experienceSuggestions[existingIndex].suggestions = suggestions;
      } else {
        // Add a new entry if the ID doesn't exist
        state.experienceSuggestions.push({ id, suggestions });
      }
    },

    removeCurrentKnownFor: (state, action: PayloadAction<string>) => {
      state.currentKnownFor = state.currentKnownFor.filter(
        (item) => item !== action.payload
      );
    },
    setMatchTone: (state, action: PayloadAction<boolean>) => {
      state.matchTone = action.payload;
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
      .addCase(fetchExperiencesSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearSuggestions,
  addCurrentKnownFor,
  removeCurrentKnownFor,
  setMatchTone,
  setSetupData,
  setIntroductionSuggestions,
  setRecommendedExperiences,
  addSuggestionsByExperienceId,
} = suggestionsSlice.actions;

export const suggestionsReducer = suggestionsSlice.reducer;
