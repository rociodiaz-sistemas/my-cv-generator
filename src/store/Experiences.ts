import { Experience } from "./types";

export const experiences: Experience[] = [
  {
    id: 1,
    label: "Web4Realty Experience",
    title: "Frontend Developer",
    company: "Web4Realty",
    date: "2019 - 2021",
    bulletPoints: [
      "Developed and maintained the front-end of real estate web applications.",
      "Collaborated with backend developers to integrate APIs and improve user experience.",
      "Worked on building scalable web applications using React and TypeScript.",
    ],
    prompt:
      "Generate a description for a frontend developer role at Web4Realty",
  },
  {
    id: 2,
    label: "Glofy Experience",
    title: "Software Engineer",
    company: "Glofy",
    date: "2021 - Present",
    bulletPoints: [
      "Worked on building scalable web applications using React and TypeScript.",
      "Collaborated with designers to implement user-friendly interfaces.",
      "Developed and maintained the front-end of real estate web applications.",
    ],
    prompt: "Generate a description for a software engineer role at Glofy",
  },
];
export default experiences;
