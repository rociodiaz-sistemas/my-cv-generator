export const SETUP_TITLE_POSITION_PROMPT = `Extract the company name of this job description.
Extract the job position title of this job description.
Separate the extracted company name and job position with semicolons.
Example:
company name;position title
Job Description:
`;

export const SETUP_TECHNICAL_SKILLS_PROMPT = `Analyze the following job posting and extract the most important keywords that represent the essential skills, qualifications, and responsibilities for the role. Focus on the main technical skills, core competencies, and specific industry terms. List these keywords only, avoiding general words or phrases. Use commas to separate each keyword.`;

export const SETUP_CONCEPTS_PROMPT = `From the job posting below, identify key developer concepts or principles that describe important aspects of the role, such as performance, scalability, optimization, clean code, complexity, maintainability, efficiency, documentation, problem-solving, etc. These should be concepts or values related to the responsibilities, work environment, and expectations described, but not specific tools or technologies. Return them as a list of keywords, separated by semicolons, with no introductory text or labels. The output should look like: concept1; concept2; concept.`;

export const SETUP_INTERPERSONAL_PROMPT = `Identify interpersonal skills from the job posting below. List them only as keywords, separated by semicolons. Do not add any labels or introductory text. The output should look exactly like: skill1; skill2; skill3`;
