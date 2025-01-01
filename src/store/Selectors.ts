// selectors.ts
import { createSelector } from "reselect";
import { RootState } from "./store";

// Basic selector to get the entire CV from the store
const selectCV = (state: RootState) => state.EditForm.CV;

// Memoized selector for getting bullet points from the CV
export const selectBulletPoints = (state: RootState, experienceId: number) =>
  selectCV(state)?.experiences.find((exp) => exp.id === experienceId)
    ?.bulletPoints ?? [];

// Memoized selector for filtered bullet points (non-empty ones)
export const makeSelectBulletPoints = () =>
  createSelector([selectBulletPoints], (bulletPoints) =>
    bulletPoints.filter((point) => point.trim() !== "")
  );
