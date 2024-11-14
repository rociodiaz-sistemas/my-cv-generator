import React from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setSkills } from "../../../store/formSlice";

const SkillsStep: React.FC = () => {
  const dispatch = useDispatch();

  // Get the current skills from Redux store or state
  const skills = useSelector((state: RootState) => state.profile.profileSkills);
  const suggestedSkills = useSelector(
    (state: RootState) => state.suggestions.skillsSuggestions
  );

  // Handle adding a suggested skill to the list
  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      dispatch(setSkills([...skills, skill])); // Add skill to Redux state
    }
  };

  // Handle removing a skill from the list
  const handleRemoveSkill = (skill: string) => {
    const updatedSkills = skills.filter((item) => item !== skill);
    dispatch(setSkills(updatedSkills)); // Remove skill from Redux state
  };

  return (
    <Box>
      <Typography variant="h6">Select Your Skills</Typography>

      {/* Display currently selected skills as chips */}
      <Box mb={2}>
        <Typography variant="subtitle1">Your Skills:</Typography>
        <Grid container spacing={1}>
          {skills.map((skill) => (
            <Grid item key={skill}>
              <Chip
                label={skill}
                onDelete={() => handleRemoveSkill(skill)}
                color="primary"
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Display suggested skills as chips with an add icon */}
      <Box>
        <Typography variant="subtitle1">Suggested Skills:</Typography>
        <Grid container spacing={1}>
          {suggestedSkills.map((skill) => (
            <Grid item key={skill}>
              <Chip
                label={skill}
                color="secondary"
                icon={<AddIcon />}
                onClick={() => handleAddSkill(skill)}
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SkillsStep;
