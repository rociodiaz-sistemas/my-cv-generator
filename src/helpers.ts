export const DEFAULT_SKILLS =
  "React (Hooks, Context API, Redux, Sagas, Lazy Loading, HOCs, Error Boundaries, React Query, React Router, Object-Oriented Programming, Storybook, Jest, React Testing Library, Enzyme), JavaScript, TypeScript, HTML, CSS, SCSS, Webpack, Rollup, Next.js, Phaser, Framer Motion, Tailwind CSS, Emotion, Styled-Components, Material UI, Chakra UI, Figma, PHP, Bilingual (English/Spanish),  ";

export const DEFAULT_PROMPTS = {
  introduction: "SAY HELLO!",
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
