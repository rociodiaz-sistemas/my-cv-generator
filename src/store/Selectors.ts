import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Memoized selector to extract specific data
export const selectBulletPoints = createSelector(
  (state: RootState) => state.formData.formExperiences,
  (_, experienceId: string) => experienceId,
  (formExperiences, experienceId) =>
    formExperiences.find(
      (exp: { id: string; bulletPoints: string[] }) => exp.id === experienceId
    )?.bulletPoints ?? []
);
