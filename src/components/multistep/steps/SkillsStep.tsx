import React, { useEffect, useState } from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setSkills } from "../../../store/formSlice";
import { KeyAttributes } from "../../../store/types";
import { COLORS, FONT_SIZES, SPACING } from "../../CVTemplate/Styles";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ReorderableSkills from "../../DragAndDropSkills";

const SkillsStep: React.FC = () => {
  const dispatch = useDispatch();

  const [currentSuggestions, setCurrentSuggestions] = useState<{
    technical: string[];
    soft: string[];
  }>({ technical: [], soft: [] });

  // Redux state selectors
  const profileSkills = useSelector(
    (state: RootState) => state.profile.profileSkills
  );
  const keyAttributes: KeyAttributes = useSelector(
    (state: RootState) => state.suggestions.KeyAttributes
  );
  const formSkills = useSelector(
    (state: RootState) => state.formData.formSkills
  );

  useEffect(() => {
    // Initialize form skills with profile skills if not already populated
    if (formSkills.technical.length === 0 && formSkills.soft.length === 0) {
      const technicalProfile = profileSkills.technical.filter((skill) =>
        [...keyAttributes.technicalSkills, ...keyAttributes.concepts].includes(
          skill
        )
      );
      const softProfile = profileSkills.soft.filter((skill) =>
        keyAttributes.interpersonalSkills.includes(skill)
      );

      // Dispatch each category separately
      dispatch(setSkills({ category: "technical", skills: technicalProfile }));
      dispatch(setSkills({ category: "soft", skills: softProfile }));
    }

    // Remove duplicates from suggestions
    const technicalSuggestions = [
      ...keyAttributes.technicalSkills,
      ...keyAttributes.concepts,
    ].filter(
      (skill) =>
        !profileSkills.technical.includes(skill) &&
        !formSkills.technical.includes(skill) &&
        !formSkills.soft.includes(skill)
    );

    const softSuggestions = keyAttributes.interpersonalSkills.filter(
      (skill) =>
        !profileSkills.soft.includes(skill) &&
        !formSkills.technical.includes(skill) &&
        !formSkills.soft.includes(skill)
    );

    setCurrentSuggestions({
      technical: technicalSuggestions,
      soft: softSuggestions,
    });
  }, [profileSkills, formSkills, keyAttributes, dispatch]);

  // Handlers
  const handleToggleProfileSkill = (
    category: "technical" | "soft",
    skill: string
  ) => {
    const isEnabled = formSkills[category].includes(skill);

    // Only toggle formSkills, not profileSkills
    const updatedSkills = {
      ...formSkills,
      [category]: isEnabled
        ? formSkills[category].filter((s) => s !== skill) // Disable (remove from formSkills)
        : [...formSkills[category], skill], // Enable (add to formSkills)
    };

    // Dispatch each category separately
    dispatch(setSkills({ category, skills: updatedSkills[category] })); // Dispatch each category with its skills
  };

  const handleAddSuggestedSkill = (
    category: "technical" | "soft",
    skill: string
  ) => {
    if (
      !formSkills[category].includes(skill) &&
      !profileSkills[category].includes(skill)
    ) {
      dispatch(
        setSkills({
          category,
          skills: [...formSkills[category], skill], // Add the new skill to the existing skills
        })
      );
      setCurrentSuggestions({
        ...currentSuggestions,
        [category]: currentSuggestions[category].filter((s) => s !== skill),
      });
    }
  };

  const handleReorderTechnical = (updatedSkills: string[]) => {
    // Dispatch the updated technical skills to Redux
    dispatch(setSkills({ category: "technical", skills: updatedSkills }));
  };

  const handleReorderSoft = (updatedSkills: string[]) => {
    // Dispatch the updated technical skills to Redux
    dispatch(setSkills({ category: "soft", skills: updatedSkills }));
  };

  return (
    <Box>
      {/* Selected Skills */}
      <Box mb={4}>
        <Typography variant="h6">Selected Skills:</Typography>
        <Grid container spacing={2}>
          {/* Technical Skills */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Technical Skills:</Typography>
            <Grid container spacing={1}>
              {profileSkills.technical.map((skill) => (
                <Grid item key={skill}>
                  <Chip
                    label={skill}
                    color={
                      formSkills.technical.includes(skill)
                        ? "primary"
                        : "default"
                    }
                    onClick={() => handleToggleProfileSkill("technical", skill)}
                    variant={
                      formSkills.technical.includes(skill)
                        ? "filled"
                        : "outlined"
                    }
                  />
                </Grid>
              ))}

              {/* Suggested Technical Skills */}
              {formSkills.technical
                .filter(
                  (skill) =>
                    !profileSkills.technical.includes(skill) &&
                    [
                      ...keyAttributes.technicalSkills,
                      ...keyAttributes.concepts,
                    ].includes(skill)
                )
                .map((skill) => (
                  <Grid item key={skill}>
                    <Chip
                      label={skill}
                      color="secondary"
                      onDelete={() =>
                        handleToggleProfileSkill("technical", skill)
                      }
                      variant="outlined"
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>

          {/* Soft Skills */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Soft Skills:</Typography>
            <Grid container spacing={1}>
              {profileSkills.soft.map((skill) => (
                <Grid item key={skill}>
                  <Chip
                    label={skill}
                    color={
                      formSkills.soft.includes(skill) ? "primary" : "default"
                    }
                    onClick={() => handleToggleProfileSkill("soft", skill)}
                    variant={
                      formSkills.soft.includes(skill) ? "filled" : "outlined"
                    }
                  />
                </Grid>
              ))}

              {/* Suggested Soft Skills */}
              {formSkills.soft
                .filter(
                  (skill) =>
                    !profileSkills.soft.includes(skill) &&
                    keyAttributes.interpersonalSkills.includes(skill)
                )
                .map((skill) => (
                  <Grid item key={skill}>
                    <Chip
                      label={skill}
                      color="secondary"
                      onDelete={() => handleToggleProfileSkill("soft", skill)}
                      variant="outlined"
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Suggested Skills */}
      <Box>
        <Typography variant="h6">Suggested Skills:</Typography>
        <Grid container spacing={2}>
          {/* Technical Suggestions */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Technical Suggestions:</Typography>
            <Grid container spacing={1}>
              {currentSuggestions.technical.map((skill) => (
                <Grid item key={skill}>
                  <Chip
                    label={skill}
                    icon={<AddIcon />}
                    onClick={() => handleAddSuggestedSkill("technical", skill)}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* Soft Suggestions */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Soft Suggestions:</Typography>
            <Grid container spacing={1}>
              {currentSuggestions.soft.map((skill) => (
                <Grid item key={skill}>
                  <Chip
                    label={skill}
                    icon={<AddIcon />}
                    onClick={() => handleAddSuggestedSkill("soft", skill)}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="h6">Overview</Typography>
        <ReorderableSkills
          skills={formSkills.technical}
          onReorder={handleReorderTechnical}
        />
        <ReorderableSkills
          skills={formSkills.soft}
          onReorder={handleReorderSoft}
        />
      </Box>
    </Box>
  );
};

export default SkillsStep;
