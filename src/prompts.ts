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
