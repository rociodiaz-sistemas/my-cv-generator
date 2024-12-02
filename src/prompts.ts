import { Key } from "react";
import { Experience, KeyAttributes, Skills } from "./store/types";

export const createSetupPrompt = (jobPosting: string) => {
  return `Analyze the following job posting and extract the following details into a JSON structure:

company: The name of the company.
jobTitleSuggestion: The job title most relevant to the job posting.
toneOfJobPosting: A brief description (1 sentence) summarizing the tone of the job posting (e.g., formal, casual, professional, minimal etc.) useful to write a resume.
jobPostingTips: A brief description (1 sentence) providing tips or insights to apply to this job based on the job posting.
KeyAttributes:
technicalSkills: A list of specific technologies or tools mentioned in the job posting (e.g., programming languages, frameworks, databases).
concepts: A list of inferred concepts or practices mentioned in the job posting (e.g., Agile, CRUD operations, etc).
interpersonalSkills: A list of interpersonal skills (soft skills) mentioned in the job posting (e.g., communication, leadership, teamwork).

The examples are merely a demonstration of the expected output. The actual values should be extracted from the job posting text.
Here is the job posting text:

${jobPosting}

Return the extracted information in the following JSON format:

{
  "company": "string",
  "jobTitleSuggestion": "string",
  "toneOfJobPosting": "string",
  jobPostingTips: "string",
  "KeyAttributes": {
    "technicalSkills": ["string", "string"],
    "concepts": ["string", "string"],
    "interpersonalSkills": ["string", "string"]
  }
}

Ensure that the information is structured and clearly organized based on the details given in the job posting.`;
};

export const createIntroductionPrompt = (
  candidatePreviousIntroduction: string,
  jobTitle: string,
  yearsOfExperience: string,
  knownFor: string[],
  jobPostingTips: string,
  keyAttributes: KeyAttributes,
  candidateSkills: Skills,
  toneOfJobPosting?: string
) => {
  return `Generate 6 unique, ${toneOfJobPosting} resume introductions for a ${jobTitle} position. Each introduction should:

1. Be 3-5 sentences long.
2. Optionally highlight the candidate's traits"
3. Use the provided Years of experience,Job Posting Tips, Candidate Skills, and Key Attributes from the job posting as inspiration but treat all of them as references. You do not need to use everything in each introduction.
4. Compare the **Candidate Skills** and **Key Attributes** from the job posting to align the introductions with job requirements while emphasizing the candidate's strengths.
5. Optionally compare the candidate's previously used default introduction. If irrelevant, ignore it.
6. Focus on crafting an impactful, concise summary that is suitable for a ${toneOfJobPosting} resume.

### Key Information:
- **Job Title**: ${jobTitle}
- **Years of Experience**: ${yearsOfExperience}
- **Candidate Traits**: ${Object.values(knownFor).join(", ")}
- **Job Posting Tips**: ${jobPostingTips}
= **Candidate's Previous Introduction**: ${candidatePreviousIntroduction}
- **Candidate Skills**:
  - Technical Skills: ${Object.values(candidateSkills.technical).join(", ")}
  = Interpersonal Skills: ${Object.values(candidateSkills.soft).join(", ")}
- **Key Attributes from the Job Posting**:
  - Technical Skills: ${keyAttributes.technicalSkills.join(", ")}
  - Concepts: ${keyAttributes.concepts.join(", ")}
  - Interpersonal Skills: ${keyAttributes.interpersonalSkills.join(", ")}

### Output Format:
The output must be a JSON object with an array of 6 strings, where each string is a unique resume introduction.

{
  "introductions": [
    "Introduction 1...",
    "Introduction 2...",
    "Introduction 3...",
    "Introduction 4...",
    "Introduction 5...",
    "Introduction 6..."
  ]
}
`;
};

export const createRecommendedExperiencePrompt = (
  keyAttributes: KeyAttributes,
  experiences: Experience[]
) => {
  return `You are an expert in resume optimization for job applications. I will provide you with:
1. **Key Attributes** that describes the requirements, responsibilities, and skills for a role.
2. A **List of Candidate Experiences**, each with details about their work, achievements, and skills.

Your task:
1. Analyze the Key Attributes and determine whether each experience is highly relevant and recommended for inclusion in the CV.
2. Use the following criteria to decide if an experience is "recommended":
   - It directly matches technologies, tools, or skills in the Key Attributes.
   - It highlights specific achievements or impact relevant to the Key Attributes responsibilities.
   - Prefer recent or high-impact experiences over general or older ones.
   - Avoid recommending experiences with significant overlap or redundancy with other experiences.

Output:
Return a JSON object for each experience with:
- "id": Experience ID.
- "recommended": true or false. Mark experiences as false if they are not strictly necessary or highly relevant.
- "reason": A detailed explanation of why the experience is relevant or why it was excluded. Be specific, mentioning exact keywords, skills, or requirements from the job posting that influenced your decision.

Constraints:
- Aim to recommend only 2–4 experiences that best match the job posting.
- Be strict in your evaluation. Mark experiences as "false" if they do not meet the above criteria.
- Provide specific reasons for inclusion or exclusion.

Here is an example of the JSON output format you should follow:

[
  {
    "id": 1,
    "recommended": true,
    "reason": "Reason for recommending this experience. Include specific matches to the job posting, such as technologies, tools, achievements, or responsibilities."
  },
  {
    "id": 2,
    "recommended": false,
    "reason": "Reason for not recommending this experience. Be explicit about why it does not align with the job posting, e.g., outdated skills, irrelevant domain, or no measurable impact."
  },
  {
    "id": 3,
    "recommended": true,
    "reason": "Reason for recommending this experience. Include specific matches to the job posting, such as relevant leadership experience or recent technical achievements."
  }
]

**Key Attributes:**
${JSON.stringify(keyAttributes)}

**Candidate Experiences:**
${JSON.stringify(experiences)}
  `;
};

export const createExperiencePrompt = (
  experience: string[],
  jobTitle: string,
  keyAttributes: KeyAttributes
) => {
  return `I need you to analyze a **candidate experience** for a ${jobTitle} position and compare it to the **job posting key attributes**. Your task is to provide **10 suggestions** on how the experience aligns with the attributes. Your output should be a JSON array of strings, with each suggestion being **one sentence** and ranked by relevance (most accurate first).

### Instructions:
1. **Input Details**:
    - **Candidate Experience**: A single job-related description of the candidate’s past work. It may include technologies, tasks, outcomes, or key achievements.
    - **Job Posting Key Attributes**: A list of skills, qualities, or technologies required by the job.

2. **Your Goal**:
    - Generate suggestions that **highlight how the candidate’s experience** matches or relates to the job posting’s key attributes. These suggestions should improve the candidate’s resume, either by **adding new bullet points**, **modifying existing ones**, or **replacing less relevant information**.

3. **How to Generate Suggestions**:
    - **Direct Matches**: Start by focusing on **explicit matches** between the candidate's experience and the job posting attributes (e.g., specific tools, methodologies, or accomplishments).
    - **Inferred Skills**: Identify **implied qualities** or tools based on the experience. For example:
        - If the experience mentions "leading a project," infer qualities such as **leadership**, **team collaboration**, or **communication**.
        - If the experience includes programming but no specific tools, infer commonly used tools (e.g., **Git**, **Node.js**, **React**).
    - **Creative Suggestions**: Later suggestions (7–10) can be **more speculative**, but they should still be **realistic and plausible** based on the context of the job and the experience.

4. **Output Format**:
    - Return your suggestions in a **JSON array** of **10 strings**, each representing **one clear sentence**.
    - Rank the suggestions by **relevance** and **accuracy**, with the most relevant ones listed first.

### Guidelines for Suggestions:
- **Clarity**: Each suggestion should be **concise and clear**, ideally one sentence.
- **Accuracy**: Start with **directly supported** suggestions based on the candidate’s experience and job posting attributes.
- **Inferences**: Use **logical reasoning** to infer skills, qualities, or technologies that the candidate might possess based on their experience.
- **Speculative Suggestions**: The last suggestions (7–10) can be more **creative** or **imaginative**, but they must still remain realistic and aligned with the job posting’s requirements.

### Output Example:
{
  "suggestions": [
    "Suggested bullet point 1 based on direct match with the job posting.",
    "Suggested bullet point 2 based on direct match with the job posting.",
    "Suggested bullet point 3 with inferred skills or tools.",
    "Suggested bullet point 4 with inferred leadership qualities.",
    "Suggested bullet point 5 with inferred technical expertise.",
    "Suggested bullet point 6 with inferred soft skills.",
    "Suggested bullet point 7 based on plausible reasoning.",
    "Suggested bullet point 8 with further inferred details.",
    "Suggested bullet point 9 with creative but relevant reasoning.",
    "Suggested bullet point 10 with more speculative connections."
  ]
}

### Input for Analysis:
**Candidate Experience**:
"${JSON.stringify(experience)}"

**Job Posting Key Attributes**:
${JSON.stringify(keyAttributes)}

Now analyze the provided inputs and generate suggestions in the specified JSON format.
`;
};
