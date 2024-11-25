import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience, Skills } from "./types";

interface ProfileState {
  profileJobTitle: string;
  profileSkills: Skills;
  profileExperiences: Experience[];
  defaultCheckedExperiences: number[];
  profileIntroduction: string;
}

const initialState: ProfileState = {
  profileJobTitle: "React Typescript Developer",
  profileSkills: {
    technical: ["React", "TypeScript"],
    soft: ["Problem-solving", "Team player"],
  },
  profileIntroduction:
    "I am a React Typescript Developer with 5 years of experience. I have worked on over 5 major proyects and migrations. I am passionate about creativity and innovation",
  defaultCheckedExperiences: [1, 2],
  profileExperiences: [
    {
      id: 1,
      label: "Web4Realty",
      title: "Lead ReactJS Developer",
      company: "Web4Realty",
      hireType: "Contract",
      dateFrom: "Mar 2024",
      dateTo: "May 2024",
      prompt: "Prompt for experience 1",
      location: "USA",
      bulletPoints: [
        "Led frontend development for a real estate CMS, optimizing load times by 80%",
        "Migrated from PHP to ReactJS/Next, enhancing UI responsiveness and stability",
        "Crafted comprehensive documentation of features and requirements to ensure a seamless migration journey.",
        "Developed dynamic, reusable components, improving scalability",
        "Enhanced test coverage with RTL/Jest and streamlined CI/CD using Bitbucket",
      ],
      project: "Web4Realty",
    },
    {
      id: 2,
      label: "Droptrack",
      title: "React Typescript Developer",
      company: "Glofy",
      location: "USA Based",
      dateFrom: "October 2023",
      dateTo: "February 2024",
      project: "Droptrack",
      prompt: "Prompt for experience 2",
      hireType: "Contract",
      bulletPoints: [
        "Managed a migration from PHP to React TypeScript",
        "Engineered an intuitive React-based media player seamlessly integrated with the Spotify API for dynamic music streaming and control",
        "Enhanced UX with multistep forms and custom hooks",
      ],
    },
    {
      id: 3,
      label: "Ingram Spark",
      title: "React Typescript Developer",
      company: "WeDevelop",
      dateFrom: "August 2023",
      dateTo: "October 2023",
      prompt: "Prompt for experience 3",
      bulletPoints: [
        "Collaborated with a team of developers to build a dynamic real-time design editor for book covers, leveraging Fabric.js and the Canvas API. Contributed to creating an intuitive interface that empowered users to customize cover designs with precision and creativity.",
        "Contributed to a large-scale, well-structured architecture adhering to robust Object-Oriented Programming (OOP) principles, ensuring maintainability, scalability, and clean code standards",
      ],
      project: "Outbound Engine",
      location: "USA Based",
      hireType: "Contract",
    },
    {
      id: 4,
      label: "Outbound Engine",
      title: "ReactJS Developer",
      company: "WeDevelop",
      dateFrom: "July 2022",
      dateTo: "August 2023",
      prompt: "Prompt for experience 3",
      bulletPoints: [
        "Led migration from ExtJS to React a real state CMS and social media platform",
        "Developed and maintained a UI component library with Rollup, NPM, Webpack, and Storybook",
        "Enhanced functionality and user experience through feature improvements and clientcommunication.",
      ],
      project: "Outbound Engine",
      location: "USA Based",
      hireType: "Contract",
    },
    {
      id: 5,
      label: "Claro",
      title: "Lead ReactJS Developer",
      company: "CFOTech",
      dateFrom: "May 2021",
      dateTo: "December 2021",
      prompt: "Prompt for experience 3",
      bulletPoints: [
        "Managed ticket creation and workload as the sole developer for the CLARO project.",
        "Developed forms with Formik and Yup, and introduced advanced validation techniques.",
      ],
      project: "Claro",
      location: "Argentina",
      hireType: "Employee",
    },
    {
      id: 6,
      label: "Triple A",
      title: "ReactJS Developer",
      company: "Baufest",
      dateFrom: "June 2019",
      dateTo: "May 2021",
      prompt: "Prompt for experience 3",
      bulletPoints: [
        "Acted as a liaison with clients at Triple A, implementing CRUD operations in MUI tables",
        "Integrated Google Analytics for user behavior insights and optimization.",
      ],
      project: "Triple A",
      location: "USA Based",
      hireType: "Employee",
    },
    {
      id: 7,
      label: "Camuzzi Gas",
      title: "Full Stack Developer .NET | Angular",
      company: "Baufest",
      dateFrom: "November 2018",
      dateTo: "June 2019",
      prompt: "Prompt for experience 3",
      bulletPoints: [
        "Began career as a Developer after topping a competitive bootcamp selection among 20 candidates",
        "Contributed to over 80 backlog items as a key team member at Camuzzi Gas",
        "Gained experience with cross-platform technologies and Cordova",
      ],
      project: "Camuzzi Gas",
      location: "Argentina",
      hireType: "Employee",
    },
    {
      id: 8,
      label: "StreamCoder",
      title:
        "React Typescript Frontend Engineer - Project Manager - UX Designer",
      company: "StreamCoder",
      dateFrom: "July 2021",
      dateTo: "Present",
      prompt: "Prompt for experience 3",
      bulletPoints: [
        "Envisioned and led the StreamCoder CMS project for custom dynamic OBS widgets",
        "Designed and implemented overlays using React TypeScript, Redux Saga, WebSockets, NodeJS, Twitch API, and StreamerBot",
        "Developed a Storybook plugin for Chakra UI theme management",
        "Mentored junior developers and designed responsive components in Figma",
      ],
      project: "StreamCoder",
      location: "Remote",
      hireType: "Self-Employed",
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
