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
    technical: [
      "React",
      "TypeScript",
      "JavaScript",
      "Redux",
      "React Query",
      "Next",
      "Material-UI",
      "Chakra UI",
      "Jest",
      "RTL",
      "Storybook",
      "Git",
      "CI/CD",
      "Docker",
      "PHP",
      "Sagas",
      "WebSockets",
      "Google Analytics",
      "Framer Motion",
      "Three.js",
      "Fabric.js",
      "Canvas API",
      "OOP",
      "Formik",
      "Yup",
      "MUI",
      "CRUD",
      "Rollup",
      "NPM",
      "Webpack",
      "Figma",
      "Redux Thunk",
      "React Forms",
    ],
    soft: [
      "Problem-solving",
      "Self-Motivated",
      "Forward-Thinking",
      "Detail-Oriented",
    ],
  },
  profileIntroduction:
    "I'm a React TypeScript Developer with 6 years of experience creating dynamic and scalable applications. Throughout my career, I've successfully led projects and migrations, from reimagining user interfaces to optimizing performance and scalability. I thrive on problem-solving and pushing the boundaries of what's possible, always looking for innovative solutions. My passion lies in turning complex challenges into intuitive, user-friendly products that drive results.",
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
      location: "USA based",
      bulletPoints: [
        "Led frontend development for a real estate CMS, optimizing page load times by 80%, enhancing user experience.",
        "Spearheaded the migration from PHP to ReactJS/Next.js, significantly improving UI responsiveness, stability, and scalability.",
        "Created comprehensive documentation to ensure smooth collaboration between teams and streamline feature integration.",
        "Developed reusable, modular components, resulting in more maintainable code and faster development cycles.",
        "Improved test coverage using RTL/Jest and streamlined CI/CD pipelines with Bitbucket, increasing deployment efficiency.",
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
        "Led a full-stack migration from PHP to React TypeScript, improving performance and long-term scalability.",
        "Engineered a seamless React-based media player that integrated with the Spotify API, enabling dynamic music streaming.",
        "Enhanced the user experience by implementing multistep forms and custom hooks for improved functionality and performance.",
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
        "Collaborated in a cross-functional team to create a real-time design editor for book covers, leveraging Fabric.js and the Canvas API for intuitive, creative customization.",
        "Contributed to the design and implementation of a scalable architecture based on Object-Oriented Programming principles, ensuring maintainable and clean code across the project.",
      ],
      project: "Ingram Spark",
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
        "Led the migration of a real estate CMS and social media platform from ExtJS to React, significantly improving UI performance and scalability.",
        "Developed and maintained a UI component library using Rollup, NPM, Webpack, and Storybook, ensuring consistency and reusability across projects.",
        "Collaborated closely with clients to enhance feature functionality and improve user experience, ensuring project goals were met and exceeded.",
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
        "Managed the full lifecycle of the CLARO project, including ticket creation, workflow management, and ensuring timely project delivery.",
        "Developed complex forms using Formik and Yup, implementing advanced validation techniques to ensure accuracy and user satisfaction.",
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
        "Liaised with clients at Triple A to design and implement CRUD operations in MUI tables, improving data management and reporting capabilities.",
        "Integrated Google Analytics to track and optimize user behavior, leading to improved product performance and user engagement.",
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
        "Began my career as a developer after being selected from a competitive bootcamp process, out of 20 candidates.",
        "Contributed to more than 80 backlog items, collaborating as a key team member at Camuzzi Gas, enhancing system capabilities and functionality.",
        "Gained experience in cross-platform technologies and worked with Cordova to extend the reach of applications across different platforms.",
      ],
      project: "Camuzzi Gas",
      location: "Argentina",
      hireType: "Employee",
    },
    {
      id: 8,
      label: "StreamCoder",
      title: "React Typescript Engineer - Leader - UX",
      company: "StreamCoder",
      dateFrom: "July 2021",
      dateTo: "Present",
      prompt: "Prompt for experience 3",
      bulletPoints: [
        "Envisioned and led the development of StreamCoder CMS, a platform for custom dynamic OBS widgets tailored for live streamers.",
        "Designed and implemented interactive overlays and integrations using React, TypeScript, Redux Saga, WebSockets, Node.js, and the Twitch API, enhancing live streaming experiences.",
        "Developed a Storybook plugin to improve Chakra UI theme management and facilitate design consistency across applications.",
        "Mentored junior developers while designing responsive UI components in Figma and ensuring best practices in UI/UX design.",
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
