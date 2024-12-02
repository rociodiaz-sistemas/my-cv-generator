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
import SectionWrapper from "./SectionWrapper";
import IntroductionStep from "./steps/IntroductionStep";
import { createSelector } from "reselect";

const FormContent: React.FC = () => {
  const { activeMainStep, activeSubstepIndex, steps } = useSelector(
    (state: RootState) => state.step
  );

  const formExperiences = useSelector(
    (state: RootState) => state.formData.formExperiences
  );

  // Logic to determine which component to render based on current step
  if (activeMainStep === "setup") {
    if (activeSubstepIndex === 0)
      return (
        <SectionWrapper title="Post a job description">
          <JobPostingForm />
        </SectionWrapper>
      );
    if (activeSubstepIndex === 1)
      return (
        <SectionWrapper title="CV Details">
          <SetupStep />
        </SectionWrapper>
      );
    if (activeSubstepIndex === 2)
      return (
        <SectionWrapper title="Write your introduction">
          <IntroductionStep />
        </SectionWrapper>
      );
    if (activeSubstepIndex === 3)
      return (
        <SectionWrapper title="Select your experiences">
          <ExperienceChecklist />
        </SectionWrapper>
      );
    if (activeSubstepIndex === 4)
      return (
        <SectionWrapper title="Select your skills">
          <SkillsStep />
        </SectionWrapper>
      );
  }

  if (activeMainStep === "experience") {
    return (
      <>
        {steps.experience.map((_, index) =>
          index === activeSubstepIndex ? (
            <SectionWrapper title={formExperiences[index].company} key={index}>
              <ExperienceStep experience={formExperiences[index]} />
            </SectionWrapper>
          ) : null
        )}
      </>
    );
  }

  if (activeMainStep === "overview") {
    return (
      <SectionWrapper title="Overview">
        <OverviewStep />
      </SectionWrapper>
    );
  }

  return null;
};

export default FormContent;
