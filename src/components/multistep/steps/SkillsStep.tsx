import React, { useEffect, useState } from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setSkills } from "../../../store/formSlice";

const SkillsStep: React.FC = () => {
  const dispatch = useDispatch();

  const [currentSuggestedSkills, setCurrentSuggestedSkills] = useState<
    string[]
  >([]);

  // Redux state selectors
  const profileSkills = useSelector(
    (state: RootState) => state.profile.profileSkills
  );
  const skillsSuggestions = useSelector(
    (state: RootState) => state.suggestions.skillsSuggestions
  );
  const formSkills = useSelector(
    (state: RootState) => state.formData.formSkills
  );

  useEffect(() => {
    // Initialize form skills with profile skills if not already populated
    if (formSkills.length === 0) {
      dispatch(setSkills(profileSkills));
    }

    // Remove duplicates between profile skills and suggestions
    const filteredSuggestions = skillsSuggestions.filter(
      (skill) => !profileSkills.includes(skill) && !formSkills.includes(skill)
    );
    setCurrentSuggestedSkills(filteredSuggestions);
  }, [profileSkills, formSkills, skillsSuggestions, dispatch]);

  // Handle toggling a profile skill (enable/disable)
  const handleToggleProfileSkill = (skill: string) => {
    if (formSkills.includes(skill)) {
      // Disable (remove from formSkills)
      dispatch(setSkills(formSkills.filter((s) => s !== skill)));
    } else {
      // Enable (add to formSkills)
      dispatch(setSkills([...formSkills, skill]));
    }
  };

  // Handle adding a suggested skill to formSkills
  const handleAddSuggestedSkill = (skill: string) => {
    if (!formSkills.includes(skill)) {
      dispatch(setSkills([...formSkills, skill]));
      setCurrentSuggestedSkills(
        currentSuggestedSkills.filter((s) => s !== skill)
      );
    }
  };

  // Handle removing a suggested skill from formSkills
  const handleRemoveSuggestedSkill = (skill: string) => {
    dispatch(setSkills(formSkills.filter((s) => s !== skill))); // Remove from formSkills
    setCurrentSuggestedSkills([...currentSuggestedSkills, skill]); // Return to suggestions
  };

  return (
    <Box>
      {/* Pool: Selected Skills */}
      <Box mb={2} mt={2}>
        <Typography variant="subtitle1">Selected Skills:</Typography>
        <Grid container spacing={1}>
          {/* Profile Skills */}
          {profileSkills.map((skill) => (
            <Grid item key={skill}>
              <Chip
                label={skill}
                sx={{
                  backgroundColor: formSkills.includes(skill)
                    ? "primary.main"
                    : "grey.200", // Light grey background when disabled
                  color: formSkills.includes(skill) ? "white" : "text.primary", // Keep text visible, just a little faded when disabled
                  borderColor: formSkills.includes(skill)
                    ? "primary.main"
                    : "grey.400", // Grey border when disabled
                  opacity: formSkills.includes(skill) ? 1 : 0.8, // Slightly faded opacity for disabled state, not too transparent
                }}
                icon={
                  !formSkills.includes(skill) ? (
                    <AddIcon sx={{ color: "primary.main", fontSize: 24 }} /> // Always primary color for the Add icon
                  ) : undefined
                }
                onDelete={
                  formSkills.includes(skill)
                    ? () => handleToggleProfileSkill(skill)
                    : undefined
                }
                onClick={() => handleToggleProfileSkill(skill)}
                variant={formSkills.includes(skill) ? "filled" : "outlined"}
              />
            </Grid>
          ))}

          {/* Suggested Skills added to formSkills */}
          {formSkills
            .filter((skill) => !profileSkills.includes(skill))
            .map((skill) => (
              <Grid item key={skill}>
                <Chip
                  label={skill}
                  color="secondary"
                  onDelete={() => handleRemoveSuggestedSkill(skill)}
                  variant="outlined"
                />
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Pool: Suggested Skills */}
      <Box>
        <Typography variant="subtitle1">Suggested Skills:</Typography>
        <Grid container spacing={1}>
          {currentSuggestedSkills.map((skill) => (
            <Grid item key={skill}>
              <Chip
                label={skill}
                color="secondary"
                icon={<AddIcon />}
                onClick={() => handleAddSuggestedSkill(skill)}
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
