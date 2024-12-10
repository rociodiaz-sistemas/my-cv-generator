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
qualifications: A list of qualifications or requirements mentioned in the job posting. Use sentences or phrases that describe the expected qualifications.

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
  "qualifications": ["string", "string"]
}

Ensure that the information is structured and clearly organized based on the details given in the job posting.`;
};

export const createIntroductionPrompt = (
  candidatePreviousIntroduction: string,
  jobTitle: string,
  yearsOfExperience: string,
  jobPostingTips: string,
  keyAttributes: KeyAttributes,
  candidateSkills: Skills,
  toneOfJobPosting?: string,
  knownFor?: string[]
) => {
  return `Generate 6 unique, ${toneOfJobPosting} resume introductions for a ${jobTitle} position. Each introduction should:

1. Be 3-5 sentences long.
2. Optionally highlight the candidate's traits"
3. Use the provided Years of experience,Job Posting Tips, Candidate Skills (optional, may be empty), and Key Attributes from the job posting as inspiration but treat all of them as references. You do not need to use everything in each introduction.
4. Compare the **Candidate Skills** and **Key Attributes** from the job posting to align the introductions with job requirements while emphasizing the candidate's strengths.
5. Optionally compare the candidate's previously used default introduction. If irrelevant, ignore it.
6. Focus on crafting an impactful, concise summary that is suitable for a ${toneOfJobPosting} resume.

### Key Information:
- **Job Title**: ${jobTitle}
- **Years of Experience**: ${yearsOfExperience}
- **Candidate Traits**: ${
    knownFor && knownFor.length > 1 ? Object.values(knownFor).join(", ") : "N/A"
  }
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
  keyAttributes: KeyAttributes,
  qualifications: string[]
) => {
  return `I need you to analyze the candidate's job experience descriptions and compare them to the key attributes and skills required for a job posting. Your task is to generate  **20 bullet points** that can **improve**, **add**, or **create new** descriptions based on the candidate's experience and the job posting's key requirements.

### Instructions:
1. **Input Details:**
    - **Candidate Job Experience (existing bullet points):** A list of bullet points describing the candidate’s previous job experience.
    - **Job Posting Key Attributes:** A list of skills, technologies, and qualities required by the job posting.
    - **Qualifications and responsabilities:** A list of qualifications, requirements or responsabilities, for the job posting.

2. **Your Goal:**
    - **Improve** the existing bullet points, making them more specific, relevant, and tailored to the job posting.
    - **Add new bullet points** that align the candidate's experience with missing skills or key attributes from the job posting.
    - **Generate new bullet points** if there are gaps in the experience or skills that can be inferred based on the job posting.

3. **How to Generate Bullet Points:**
    - **Direct Matches:** Focus on matching **explicit** key attributes from the job posting with the candidate’s experience.
    - **Inferred Skills:** Identify skills or experiences that are **not explicitly mentioned** but can be logically inferred from the candidate's work (e.g., using common tools or frameworks in the industry).
    - **Create New Bullet Points:** If a key skill or experience is missing, generate a **new bullet point** that seems **realistic** based on the job’s requirements (but should align with the candidate’s overall profile).
    - **Ensure Relevance:** All bullet points should be **relevant**, **clear**, and **concise**.

4. **Output Format:**
    - Return a JSON object containing a list of at least **10 bullet points**. These should include **a mix of improvements**, **new suggestions**, and **inferred additions**.

### Example Output Format Structure:
{
  "updated_experience": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "...",
  ]
}
Input for Analysis:
Candidate Experience:
${JSON.stringify(experience)}

Job Posting Key Attributes:
${JSON.stringify(keyAttributes)}

Job Posting qualifications and responsabilities:
${JSON.stringify(qualifications)}
`;
};
