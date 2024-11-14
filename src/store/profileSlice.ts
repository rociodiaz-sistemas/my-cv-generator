import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience } from "./types";

interface ProfileState {
  jobTitle: string;
  skills: string[];
  profileExperiences: Experience[];
  defaultCheckedExperiences: number[];
  knownFor: string[];
}

const initialState: ProfileState = {
  jobTitle: "React Typescript Developer",
  skills: ["React", "TypeScript", "Express"],
  defaultCheckedExperiences: [1, 2],
  knownFor: [
    "Creative",
    "Innovative",
    "Problem-solver",
    "Team player",
    "Adaptable",
  ],
  profileExperiences: [
    {
      id: 1,
      label: "Experience 1",
      title: "Title 1",
      company: "Company 1",
      date: "2024",
      prompt: "Prompt for experience 1",
      bulletPoints: ["Bullet 1", "Bullet 2", "Bullet 3"],
    },
    {
      id: 2,
      label: "Experience 2",
      title: "Title 2",
      company: "Company 2",
      date: "2023",
      prompt: "Prompt for experience 2",
      bulletPoints: ["Bullet 1", "Bullet 2", "Bullet 3"],
    },
    {
      id: 3,
      label: "Experience 3",
      title: "Title 3",
      company: "Company 3",
      date: "2022",
      prompt: "Prompt for experience 3",
      bulletPoints: ["Bullet 1", "Bullet 2", "Bullet 3"],
    },
  ],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
