import React, { useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import { HelpOutline } from "@mui/icons-material"; // Import icon for tooltip
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setExperiencesAndSteps } from "../../../store/uiSlice"; // Action to update selected experiences
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAIResponse } from "../../../hooks/useAIResponses";
import { createRecommendedExperiencePrompt } from "../../../prompts";
import { setRecommendedExperiences } from "../../../store/suggestionsSlice";
import Loading from "../../Loading";

const ExperienceChecklist: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isComponentLoading, setIsComponentLoading] = React.useState(false);

  // Get the selected experiences from Redux (will include default selections)
  const selectedExperiences = useSelector(
    (state: RootState) => state.ui.selectedExperiences
  );

  const keyAttributes = useSelector(
    (state: RootState) => state.suggestions.KeyAttributes
  );

  // Get all available experiences from the profile
  const profileExperiences = useSelector(
    (state: RootState) => state.profile.profileExperiences
  );

  // Get recommended experiences from AI response
  const recommendedExperiences = useSelector(
    (state: RootState) => state.suggestions.recommendedExperiences
  );

  const { data, isLoading, isError } = useAIResponse(
    createRecommendedExperiencePrompt(keyAttributes, profileExperiences),
    recommendedExperiences.length < 1
  );

  useEffect(() => {
    if (data && data.choices && data.choices.length > 0 && !isLoading) {
      try {
        console.log(setIsComponentLoading(true));
        const responseContent = data.choices[0]?.message?.content;
        if (responseContent) {
          const parsedData = JSON.parse(responseContent);
          dispatch(setRecommendedExperiences(parsedData));
          setIsComponentLoading(false);
        }
      } catch (error) {
        console.error("Error parsing response content:", error);
      }
    }
  }, [data, dispatch, isLoading]);

  useEffect(() => {
    // When the component mounts, we want to set the selected experiences to the defaultCheckedExperiences
    if (selectedExperiences.length === 0) {
      const selectedExperiencesList = profileExperiences.filter((exp) =>
        recommendedExperiences.find(
          (rec) => rec.id === exp.id && rec.recommended
        )
      );
      dispatch(setExperiencesAndSteps(selectedExperiencesList));
    }
  }, [
    dispatch,
    selectedExperiences,
    recommendedExperiences,
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

  if (isComponentLoading) {
    return <Loading whatItsLoading="your selection of experiences" />;
  }

  return (
    <Box>
      {profileExperiences.map((exp) => {
        const recommendation = recommendedExperiences.find(
          (rec) => rec.id === exp.id
        );
        return (
          <Box key={exp.id}>
            <Stack direction="row" alignItems="center">
              <FormControlLabel
                sx={{ display: "block" }}
                control={
                  <Checkbox
                    checked={selectedExperiences.includes(exp.id)} // Check if the ID is in selectedExperiences
                    onChange={(e) =>
                      handleCheckboxChange(exp.id, e.target.checked)
                    } // Handle checkbox change
                    color="primary"
                  />
                }
                label={`${exp.title} ${exp.company} ${exp.dateFrom}`}
              />
              {recommendation?.recommended && (
                <Stack direction="row" alignItems="center">
                  <Typography variant="body2" color="primary">
                    Recommended
                  </Typography>
                  <Tooltip
                    title={recommendation.reason || "No reason provided"}
                  >
                    <HelpOutline
                      sx={{ color: "primary.main", marginLeft: 1 }}
                    />
                  </Tooltip>
                </Stack>
              )}
            </Stack>
            <Typography variant="body2">
              <ul>
                {exp.bulletPoints?.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default ExperienceChecklist;
