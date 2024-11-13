// FormContent.tsx
import React from "react";
import { useSelector } from "react-redux";
import SetupStep from "./steps/SetupStep";
import ExperienceChecklist from "./steps/ExperienceChecklist";
import { RootState } from "../../store/store";
import ExperienceStep from "./steps/ExperienceStep";
import OverviewStep from "./steps/OverviewStep";
import SkillsStep from "./steps/SkillsStep";
import JobPostingForm from "./steps/JobPostingForm";

const FormContent: React.FC = () => {
  const { activeMainStep, activeSubstepIndex, steps } = useSelector(
    (state: RootState) => state.step
  );

  // Logic to determine which component to render based on current step
  if (activeMainStep === "setup") {
    if (activeSubstepIndex === 0) return <JobPostingForm />;
    if (activeSubstepIndex === 1) return <SetupStep />;
    if (activeSubstepIndex === 2) return <ExperienceChecklist />;
    if (activeSubstepIndex === 3) return <SkillsStep />;
  }

  if (activeMainStep === "experience") {
    return (
      <>
        {steps.experience.map((_, index) =>
          index === activeSubstepIndex ? <ExperienceStep /> : null
        )}
      </>
    );
  }

  if (activeMainStep === "overview") {
    return <OverviewStep />;
  }

  return null;
};

export default FormContent;
