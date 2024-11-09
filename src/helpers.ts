export const DEFAULT_SKILLS =
  "React (Hooks, Context API, Redux, Sagas, Lazy Loading, HOCs, Error Boundaries, React Query, React Router, Object-Oriented Programming, Storybook, Jest, React Testing Library, Enzyme), JavaScript, TypeScript, HTML, CSS, SCSS, Webpack, Rollup, Next.js, Phaser, Framer Motion, Tailwind CSS, Emotion, Styled-Components, Material UI, Chakra UI, Figma, PHP, Bilingual (English/Spanish),  ";

export const INITIAL_PROMPT_EXPERIENCE = `Given the following job posting and the detailed job experience, carefully compare the two to select and tailor only the most relevant details from the job experience. Focus on emphasizing the skills and achievements that most directly align with the job requirements, while omitting unrelated or less relevant points. Specifically:

Highlight the core technologies and tools from the job experience that match the ones listed in the job posting (e.g., React.js, Redux, TypeScript, RESTful APIs).
Emphasize key responsibilities and tasks that mirror those in the job posting (e.g., performance optimization, automated testing, collaboration with teams).
Include specific outcomes or achievements only when they strongly demonstrate alignment with the job posting requirements.
Avoid adding, inventing, or speculating on new information not present in the original job experience. If a detail is missing in the job experience, do not include it.

Combine similar tasks and technologies into single bullet points to reduce redundancy. If multiple responsibilities involve the same tools or skills (e.g., React, Redux, performance optimization), group them into a concise, cohesive statement to maintain clarity.

The goal is to make the job experience concise, focusing exclusively on the key technologies, tools, and outcomes that align with the job posting while omitting irrelevant details. The response should be formatted in bullet points only, without any additional human commentary.`;

export const INITIAL_PROMPT_INTRODUCTION = ``;

export const web4Realty_PROMPT = `React Developer at BrightWeb Solutions
Position: Front-End Developer
Duration: January 2020 – Present
Location: Remote

Built and maintained responsive web applications using React.js, Redux, and TypeScript, serving a user base of 200,000+ monthly users.
Led the implementation of lazy loading and code-splitting strategies, resulting in a 30% decrease in page load time.
Collaborated closely with backend developers to integrate RESTful APIs and optimize data flow, ensuring seamless user experiences.
Developed reusable components using Material UI and custom themes, enhancing UI consistency and developer efficiency across projects.
Utilized Cypress for end-to-end testing, maintaining 90% test coverage and reducing the bug count by 25%.`;

export const glofy_PROMPT = `React Developer at FinixTech
Position: Senior Front-End Developer
Duration: April 2019 – December 2022
Location: New York, NY

Designed and implemented a financial dashboard with React.js and Redux, displaying real-time data for thousands of users, and reduced page load times by 40% through effective caching and code optimization.
Employed React hooks, Context API, and custom hooks to streamline state management and minimize dependencies.
Integrated RESTful APIs with Redux-Saga, improving data consistency and handling asynchronous requests more effectively.
Set up CI/CD pipelines with GitHub Actions and CircleCI, which improved deployment frequency by 50%.
Conducted peer code reviews and mentored junior developers, contributing to a knowledge-sharing culture and clean code practices.`;

export const weDevelop1_PROMPT = `React Developer at HealthSync
Position: UI Engineer
Duration: February 2018 – August 2021
Location: Remote

Developed a healthcare management system using React, Redux, and TypeScript, focusing on performance optimization and accessibility compliance.
Worked with designers to transform UX wireframes into responsive, accessible web applications, reducing user complaints about navigation by 30%.
Implemented unit and integration tests with Jest and React Testing Library, raising test coverage to 85% and cutting down regression issues by 40%.
Used React’s memoization techniques (React.memo, useMemo) to improve application performance by minimizing unnecessary re-renders.
Conducted A/B testing on key features, increasing user engagement by 20%.`;

export const weDevelop2_PROMPT = `React Developer at VividTech Labs
Position: Front-End Engineer
Duration: June 2017 – October 2020
Location: San Francisco, CA

Rebuilt a legacy application from Angular to React, resulting in improved performance and maintainability, and reduced technical debt by 60%.
Employed TypeScript and reusable functional components to enhance code quality and scalability across the application.
Integrated GraphQL for data management, which reduced network requests and improved data-fetching speed by 25%.
Established and enforced best practices for component design and styling, using Styled Components to ensure consistency in UI elements.
Led performance audits and introduced React Profiler, identifying bottlenecks and achieving a 35% boost in component rendering speed.`;

export const cfotech_PROMPT = `React Developer at MarketFlex
Position: Full-Stack Developer (React & Node.js)
Duration: September 2019 – Present
Location: Austin, TX

Built and maintained e-commerce features with React, Redux, and Node.js, supporting product pages, search, and checkout for over 100,000 monthly users.
Optimized user experience by implementing a responsive design and handling cross-browser compatibility issues, increasing mobile conversion rates by 15%.
Developed reusable UI components with Ant Design, enabling faster development and maintaining a consistent look and feel.
Wrote and maintained unit tests with Jest, achieving 95% test coverage and reducing bugs in production.
Integrated payment gateways and used WebSockets for real-time notifications, which improved user satisfaction and retention.`;

export const baufest1_PROMPT = `React Developer at CodeWave
Position: Junior React Developer
Duration: July 2020 – March 2022
Location: Remote

Contributed to the development of a customer support tool using React, Context API, and Tailwind CSS, providing a visually appealing, responsive interface.
Worked on optimizing component performance by using lazy loading and dynamic imports, reducing page load time by 20%.
Integrated RESTful APIs and ensured seamless communication between the front end and the backend.
Improved accessibility by implementing WAI-ARIA roles and handling keyboard navigation, making the application accessible to a broader audience.
Collaborated with senior developers in Agile sprint cycles, gaining valuable experience in collaborative coding and team workflows.`;

export const baufest2_PROMPT = `React Developer at TrendHub
Position: Front-End Developer
Duration: August 2019 – December 2021
Location: Remote

Spearheaded the development of a high-traffic social media analytics dashboard using React, Redux, and TypeScript, serving over 50,000 daily users.
Improved data rendering speed by 45% by implementing virtualization techniques for large data sets and using React’s Suspense and lazy loading.
Worked with the design team to build a fully responsive, mobile-first UI, increasing mobile traffic by 30%.
Established a component library with Storybook, enabling cross-team collaboration and faster feature releases.
Built integration tests using Cypress and unit tests with Jest, achieving 90% test coverage and minimizing production bugs.`;

export const baufest3_PROMPT = `React Developer at EduLink Solutions
Position: Software Engineer
Duration: February 2020 – September 2023
Location: Boston, MA

Developed an online education platform using React.js, Context API, and TypeScript, which supported a monthly user base of 80,000 students.
Integrated video streaming with WebRTC and optimized rendering for low-latency, high-quality playback, improving student engagement by 25%.
Enhanced app performance with custom hooks and React.memo, reducing unnecessary re-renders and boosting load speed by 35%.
Implemented role-based access control and user authentication with Firebase, ensuring secure and streamlined access for users.
Participated in Agile workflows, conducting sprint retrospectives and contributing to continuous improvement in the development process.`;

export const streamCoder_PROMPT = `React Developer at GreenWorks Corp
Position: Senior React Developer
Duration: January 2018 – May 2022
Location: Chicago, IL

Led a team to develop an environmental impact tracking tool using React, Redux, and D3.js, allowing users to visualize carbon footprint data interactively.
Improved data visualization performance by 40% with optimizations in D3 rendering and by implementing async data fetching with Redux Thunk.
Integrated RESTful APIs and WebSocket connections, enabling real-time updates and seamless data flow across the application.
Mentored junior developers on React best practices, helping the team standardize code quality through reusable components and consistent styling with CSS modules.
Built and maintained automated CI/CD pipelines with Jenkins and GitHub Actions, reducing deployment time by 50% and increasing overall release frequency.`;

export const INTRODUCTION_PROMPT = ``;

export const DEFAULT_PROMPTS = {
  introduction: ``,
  web4Realty: ` ${INITIAL_PROMPT_EXPERIENCE} Job Experience for CV: React Developer at CodeVision LLC
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
