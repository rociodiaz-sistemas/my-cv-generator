import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandableSection: React.FC = () => {
  return (
    <Container>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>ChatGPT Prompt</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Task: I will provide you with two pieces of text: A detailed CV:
            This is a CV with a comprehensive list of past job experiences and
            responsibilities, along with specific accomplishments. A Job
            Posting: This is a job description for a position I am applying to.
            Your task is to compare the two texts in great detail, matching the
            relevant skills, experiences, and qualifications from the CV to the
            requirements in the job posting. You should follow these guidelines
            while completing the task: Do not invent anything: You must use the
            information provided in the CV. Do not add or modify any details
            about the experiences or skills that are not already in the CV.
            Compare experience and skills: Look for overlapping skills,
            keywords, or responsibilities between the CV and the job
            description. Align the CV's job experiences with the requirements or
            responsibilities mentioned in the job posting. Create a tailored CV:
            Introduction: Write a concise introduction (3-4 sentences) that
            highlights the most relevant experience and skills tailored to the
            job post. The introduction should focus on the candidate’s strengths
            and relevant expertise based on the job description. Experience: For
            each job listed in the CV, match the tasks and responsibilities with
            the job posting’s requirements. Only include experiences that align
            with the role. For each role, mention how the past duties directly
            relate to the new job’s expectations. Be specific and detailed.
            Guidelines to follow for the tailored CV: The introduction should
            always include a statement about the candidate’s relevant
            experience, emphasizing skills and expertise directly related to the
            job post. In the experience section, mention job titles, dates, and
            employers. Be specific about key achievements that align with the
            job's requirements. For example, if the job asks for "experience
            with React", and the CV shows experience with React, mention the
            specific React-related tasks and successes. The output must be
            structured clearly, with headings for the introduction and
            experience section. Avoid adding irrelevant details or skills that
            are not mentioned in the original CV. Only include details from the
            job posting that match the experience. Tone and style: The tone
            should be professional, clear, and focused on the candidate's
            qualifications for the role. Do not make the language overly verbose
            or flowery; aim for clear, concise, and factual language. Once the
            comparison is made, generate a tailored CV that is aligned with the
            job post provided, reflecting the candidate’s qualifications and
            experience accurately and in a manner that highlights their fit for
            the role. This prompt gives ChatGPT clear instructions on comparing
            the CV with the job posting, focusing on relevant skills and
            experiences, and outputting a tailored CV. The rules you’ve set
            ensure it only works with what’s provided, giving you the most
            accurate results possible. Feel free to modify this prompt as needed
            to better fit your specific use case.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default ExpandableSection;
