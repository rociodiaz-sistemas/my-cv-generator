import { Experience, StepConfig } from "../../store/types";
import CVStep from "./CVStep";
import ExperienceChecklist from "./steps/ExperienceChecklist";

export const getStepConfig = (
  selectedExperiences: number[],
  allExperiences: Experience[]
): StepConfig[] => {
  // Static setup steps
  const setupSteps: StepConfig[] = [
    {
      component: CVStep,
      props: {
        field: "title",
        isFormField: true,
        multiline: false,
        id: "title",
        label: "Title",
      },
    },
    {
      component: CVStep,
      props: {
        field: "jobPosting",
        isFormField: false,
        id: "jobPosting",
        label: "Job Posting",
      },
    },
    {
      component: ExperienceChecklist,

      props: {
        field: "experienceChecklist",
        isFormField: false,
        id: "experienceChecklist",
        label: "Experience Checklist",
      },
    },
  ];

  // Dynamic experience steps based on selected experiences
  const experienceSteps: StepConfig[] = selectedExperiences
    .map((expId) => {
      const experience = allExperiences.find((exp) => exp.id === expId);
      return experience
        ? {
            id: `experience-${experience.id}`,
            label: `${experience.label}`,
            component: CVStep,
            isFormField: true,
            prompt: experience.prompt,
          }
        : null;
    })
    .filter(Boolean) as StepConfig[]; // Filter out nulls if an experience isn't found

  // Static overview step
  const overviewSteps: StepConfig[] = [
    {
      props: {
        field: "overview",
        id: "overview",
        label: "Overview",
        isFormField: true,
      },

      component: ExperienceChecklist,
    },
  ];

  return [...setupSteps, ...experienceSteps, ...overviewSteps];
};
