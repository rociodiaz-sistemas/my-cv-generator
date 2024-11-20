import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience } from "./types";

interface ProfileState {
  profileJobTitle: string;
  profileSkills: string[];
  profileExperiences: Experience[];
  defaultCheckedExperiences: number[];
  knownFor: string[];
  profileIntroduction: string;
}

const initialState: ProfileState = {
  profileJobTitle: "React Typescript Developer",
  profileSkills: ["React", "TypeScript", "Express"],
  profileIntroduction:
    "I am a React Typescript Developer with 5 years of experience. I have worked on over 5 major proyects and migrations. I am passionate about creativity and innovation",
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
      dateFrom: "2024",
      prompt: "Prompt for experience 1",
      bulletPoints: ["Bullet 1", "Bullet 2", "Bullet 3"],
    },
    {
      id: 2,
      label: "Experience 2",
      title: "Title 2",
      company: "Company 2",
      dateFrom: "2023",
      prompt: "Prompt for experience 2",
      bulletPoints: ["Bullet 1", "Bullet 2", "Bullet 3"],
    },
    {
      id: 3,
      label: "Experience 3",
      title: "Title 3",
      company: "Company 3",
      dateFrom: "2022",
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
