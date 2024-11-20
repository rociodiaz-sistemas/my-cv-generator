import React, { useEffect } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setExperiencesAndSteps } from "../../../store/uiSlice"; // Action to update selected experiences
import { useAppDispatch } from "../../../hooks/useAppDispatch";

const ExperienceChecklist: React.FC = () => {
  const dispatch = useAppDispatch();

  // Get the selected experiences from Redux (will include default selections)
  const selectedExperiences = useSelector(
    (state: RootState) => state.ui.selectedExperiences
  );

  // Get all available experiences from the profile
  const profileExperiences = useSelector(
    (state: RootState) => state.profile.profileExperiences
  );

  // Get the default checked experiences from profile (these are initially selected)
  const defaultCheckedExperiences = useSelector(
    (state: RootState) => state.profile.defaultCheckedExperiences
  );

  useEffect(() => {
    // When the component mounts, we want to set the selected experiences to the defaultCheckedExperiences
    if (selectedExperiences.length === 0) {
      const selectedExperiencesList = profileExperiences.filter((exp) =>
        defaultCheckedExperiences.includes(exp.id)
      );
      dispatch(setExperiencesAndSteps(selectedExperiencesList));
    }
  }, [
    dispatch,
    selectedExperiences,
    defaultCheckedExperiences,
    profileExperiences,
  ]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const updatedSelectedExperiencesId = checked
      ? [...selectedExperiences, id]
      : selectedExperiences.filter((item) => item !== id);

    const updatedSelectedExperiences = profileExperiences.filter((exp) =>
      updatedSelectedExperiencesId.includes(exp.id)
    );

    dispatch(setExperiencesAndSteps(updatedSelectedExperiences));
  };

  return (
    <Box>
      {profileExperiences.map((exp) => (
        <>
          <FormControlLabel
            sx={{ display: "block" }}
            key={exp.id}
            control={
              <Checkbox
                checked={selectedExperiences.includes(exp.id)} // Check if the ID is in selectedExperiences
                onChange={(e) => handleCheckboxChange(exp.id, e.target.checked)} // Handle checkbox change
                color="primary"
              />
            }
            label={`${exp.title} ${exp.company} ${exp.dateFrom}`}
          />
          <Typography variant="body2">
            <ul>
              {exp.bulletPoints?.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </Typography>
        </>
      ))}
    </Box>
  );
};

export default ExperienceChecklist;
