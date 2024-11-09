export const DEFAULT_SKILLS =
  "React (Hooks, Context API, Redux, Sagas, Lazy Loading, HOCs, Error Boundaries, React Query, React Router, Object-Oriented Programming, Storybook, Jest, React Testing Library, Enzyme), JavaScript, TypeScript, HTML, CSS, SCSS, Webpack, Rollup, Next.js, Phaser, Framer Motion, Tailwind CSS, Emotion, Styled-Components, Material UI, Chakra UI, Figma, PHP, Bilingual (English/Spanish),  ";

export const DEFAULT_PROMPTS = {
  introduction: `Job Experience for CV: React Developer at CodeVision LLC
Position: Senior React Developer
Company: CodeVision LLC
Duration: May 2021 - Present
Location: Remote

Responsibilities & Achievements:

Developed Scalable Web Applications: Led the development of a dynamic, scalable web application for a fintech client, using React.js, Redux, and TypeScript. The application supported over 500,000 active users daily and integrated with multiple third-party APIs for real-time financial data.
State Management with Redux & Context API: Utilized Redux for global state management, ensuring smooth data flow across the application. Implemented React's Context API for simpler state management in non-critical components, reducing boilerplate code and improving maintainability.
Optimized Performance: Improved the application’s performance by 40% by implementing lazy loading and code splitting strategies using React's Suspense and dynamic imports. Also optimized rendering with React.memo and useMemo to reduce unnecessary re-renders.
Automated Testing with Jest & Cypress: Created a suite of automated unit tests for components using Jest and testing-library/react. Developed end-to-end tests using Cypress to ensure the stability of the web app. This resulted in a 30% reduction in manual testing time and improved test coverage by 50%.
Collaborated with UX/UI Teams: Worked closely with designers to ensure the application met high usability standards and matched the design specifications. Incorporated Material UI for component libraries and custom themes, enhancing user experience and accessibility.
API Integration: Integrated and consumed RESTful APIs to pull real-time data for the application. Managed async data flow with Redux middleware (redux-thunk) and handled complex state management for API responses, ensuring the application was responsive and real-time.
CI/CD Implementation: Set up continuous integration and continuous deployment pipelines using GitHub Actions and Jenkins, which improved deployment frequency by 60%. Ensured the system was automated, reducing errors and manual intervention.
Code Reviews & Mentorship: Conducted code reviews and mentored junior developers, promoting best practices in clean code, testing, and debugging techniques. Provided regular feedback on code performance and optimization.
Agile Methodology: Participated in daily standups, sprint planning, and retrospectives as part of an Agile team. Ensured the timely delivery of features and bug fixes while maintaining a focus on high-quality, maintainable code.`,
  web4Realty: "tell briefly about frodo baggins",
  glofy: "say hello!",
  weDevelop1: "tell me a joke about javascript",
  weDevelop2: "give me cute emojis",
  cfotech: "what is a meme",
  baufest1: "do you think it's dangerous to look for a job on election month?",
  baufest2: "say something cool",
  baufest3: "im testing this prompt for my project with AI prompts!",
  streamCoder: "what is the best way to learn to code?",
  skills: "how is it that you are free?",
};

const INITIAL_PROMPT = `Given the following job posting and the detailed job experience, compare the two and tailor the job experience to emphasize the most relevant skills and achievements that directly align with the job requirements. Specifically, focus on:

- The core technologies and tools mentioned in the job posting (e.g., React.js, Redux, TypeScript, RESTful APIs, etc.)
- Key responsibilities and tasks from the posting (e.g., performance optimization, automated testing, collaboration with teams, etc.)
- Specific outcomes or achievements that best demonstrate how the experience matches the job posting.

Do not invent, add, or speculate new information that is not present in the original job experience. If a detail is missing in the job experience, do not include it.

Group similar tasks and technologies together where possible. If multiple achievements or responsibilities involve the same tools or skills (e.g., React, Redux, performance optimization), combine them into a single, concise bullet point while maintaining clarity. The goal is to make the job experience concise, without losing essential details.

The final tailored job experience should highlight the key technologies, tools, and outcomes from the original job experience that align with the job posting, reducing unnecessary repetition or irrelevant details. The response should be formatted in bullet points only, with no additional human commentary.`;
