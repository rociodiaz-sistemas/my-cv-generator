import React, { useEffect } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setSelectedExperiences } from "../../../store/uiSlice"; // Action to update selected experiences

const ExperienceChecklist: React.FC = () => {
  const dispatch = useDispatch();

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
      dispatch(setSelectedExperiences(defaultCheckedExperiences)); // Set default experiences if none are selected
    }
  }, [dispatch, selectedExperiences, defaultCheckedExperiences]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const updatedSelectedExperiences = checked
      ? [...selectedExperiences, id]
      : selectedExperiences.filter((item) => item !== id);

    dispatch(setSelectedExperiences(updatedSelectedExperiences)); // Update selected experiences in Redux
  };

  return (
    <Box>
      {profileExperiences.map((exp) => (
        <FormControlLabel
          key={exp.id}
          control={
            <Checkbox
              checked={selectedExperiences.includes(exp.id)} // Check if the ID is in selectedExperiences
              onChange={(e) => handleCheckboxChange(exp.id, e.target.checked)} // Handle checkbox change
              color="primary"
            />
          }
          label={exp.label}
        />
      ))}
      <Typography>
        Experience 2 suggested because of keywords: blabla
      </Typography>
    </Box>
  );
};

export default ExperienceChecklist;
