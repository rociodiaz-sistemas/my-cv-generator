import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  Chip,
  Stack,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Circle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateExperienceBulletpoints } from "../../../store/formSlice";
import { Experience } from "../../../store/types";
import { useAIResponse } from "../../../hooks/useAIResponses";
import { createExperiencePrompt } from "../../../prompts";
import Loading from "../../Loading";
import { addSuggestionsByExperienceId } from "../../../store/suggestionsSlice";

interface ExperienceStepProps {
  experience: Experience;
}

const ExperienceStep: React.FC<ExperienceStepProps> = ({ experience }) => {
  const dispatch = useDispatch();

  const [isComponentLoading, setIsComponentLoading] = useState(false);

  const profileExperiences = useSelector(
    (state: RootState) => state.profile.profileExperiences
  );

  const formJobTitle = useSelector(
    (state: RootState) => state.formData.formJobTitle
  );

  const keyAttributes = useSelector(
    (state: RootState) => state.suggestions.KeyAttributes
  );

  const suggestions = useSelector(
    (state: RootState) =>
      state.suggestions.experienceSuggestions.find(
        (item) => item.id === experience.id
      ) || { suggestions: undefined }
  );

  const bulletPoints = useSelector(
    (state: RootState) =>
      state.formData.formExperiences.find((exp) => exp.id === experience.id)
        ?.bulletPoints ?? []
  );

  // Refs to store the text input elements
  const bulletPointRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const { data, isLoading, isError } = useAIResponse(
    createExperiencePrompt(bulletPoints, formJobTitle, keyAttributes),
    suggestions.suggestions === undefined
  );

  useEffect(() => {
    if (!isLoading && data?.choices?.length > 0) {
      try {
        const responseContent = data.choices[0]?.message?.content;
        if (responseContent) {
          const parsedData = JSON.parse(responseContent);
          console.log("Parsed data:", parsedData.updated_experience);
          dispatch(
            addSuggestionsByExperienceId({
              id: experience.id,
              suggestions: parsedData.updated_experience,
            })
          );
        }
      } catch (error) {
        console.error("Error parsing response content:", error);
      } finally {
        setIsComponentLoading(false);
      }
    }
  }, [isLoading]);

  // Handler for changes in a bullet point input
  const handleBulletPointChange = (index: number, value: string) => {
    const updatedBulletPoints = [...bulletPoints];
    updatedBulletPoints[index] = value; // Update the specific bullet point

    // Dispatch updated bullet points to Redux
    dispatch(
      updateExperienceBulletpoints({
        id: experience.id,
        bulletPoints: updatedBulletPoints,
      })
    );
  };

  useEffect(() => {
    const filteredBulletPoints = bulletPoints.filter(
      (point) => point.trim() !== ""
    );

    // Dispatch updated bullet points to Redux
    dispatch(
      updateExperienceBulletpoints({
        id: experience.id,
        bulletPoints: filteredBulletPoints,
      })
    );
  }, []); // Empty dependency array to run only on mount

  const handleAddSuggestion = useCallback(
    (suggestion: string) => {
      const updatedBulletPoints = [...bulletPoints, suggestion];
      dispatch(
        updateExperienceBulletpoints({
          id: experience.id,
          bulletPoints: updatedBulletPoints,
        })
      );
    },
    [bulletPoints, dispatch, experience.id]
  );

  const handleReset = () => {
    const profileExperience = profileExperiences.find(
      (exp) => exp.id === experience.id
    );

    if (profileExperience) {
      // Dispatch reset values to Redux
      dispatch(
        updateExperienceBulletpoints({
          id: experience.id,
          bulletPoints: profileExperience.bulletPoints ?? [],
        })
      );
    }
  };

  // Handler for "Enter" key press to add a new bullet point and focus it
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default action (new line)

      dispatch(
        updateExperienceBulletpoints({
          id: experience.id,
          bulletPoints: [...bulletPoints, ""],
        })
      );

      // Focus the new bullet point input after adding it
      setTimeout(() => {
        const newIndex = bulletPoints.length;
        bulletPointRefs.current[newIndex]?.focus(); // Focus the new input field

        // Set cursor to the end of the input
        const lastInput = bulletPointRefs.current[newIndex];
        if (lastInput) {
          const len = lastInput.value.length ?? 0;
          lastInput.setSelectionRange(len, len); // Place cursor at the end
        }
      }, 0);
    }

    // Handle Delete key press when the input is empty
    if (event.key === "Backspace" || event.key === "Delete") {
      if (bulletPoints[index] === "") {
        // Remove the bullet point if it is empty
        const updatedBulletPoints = [...bulletPoints];

        updatedBulletPoints.splice(index, 1);
        dispatch(
          updateExperienceBulletpoints({
            id: experience.id,
            bulletPoints: updatedBulletPoints,
          })
        );

        // Delay focus management to prevent conflicts
        setTimeout(() => {
          // Focus the previous bullet point if available
          if (index > 0) {
            bulletPointRefs.current[index - 1]?.focus(); // Focus previous input
            // Set cursor to the end of the previous input
            const len = bulletPointRefs.current[index - 1]?.value.length ?? 0;
            bulletPointRefs.current[index - 1]?.setSelectionRange(len, len); // Place cursor at the end
          } else if (updatedBulletPoints.length > 0) {
            // Focus the last bullet point if it's the first one being deleted
            bulletPointRefs.current[updatedBulletPoints.length - 1]?.focus();
            // Set cursor to the end of the last bullet point
            const len =
              bulletPointRefs.current[updatedBulletPoints.length - 1]?.value
                .length ?? 0;
            bulletPointRefs.current[
              updatedBulletPoints.length - 1
            ]?.setSelectionRange(len, len);
          }
        }, 50); // Use a small delay to allow the DOM to update first
      }
    }
  };

  if (isComponentLoading || isLoading) {
    return (
      <Loading whatItsLoading={`your experience at ${experience.company}`} />
    );
  }

  return (
    <Box>
      {/* Header with title and date */}
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <Typography variant="body2">{experience.title} - </Typography>
        <Typography variant="body2">{experience.dateFrom}</Typography>
        {/* Reset Button */}
        <Button
          color="secondary"
          onClick={handleReset} // Reset bullet points
          sx={{ marginTop: 0, p: 0 }}
        >
          Reset
        </Button>
      </Stack>

      {/* Render each bullet point as an individual input */}
      <Box sx={{ marginBottom: 2 }}>
        {bulletPoints.map((point, index) => (
          <TextField
            key={index}
            fullWidth
            value={point}
            onChange={(e) => handleBulletPointChange(index, e.target.value)} // Update bullet point
            variant="standard"
            multiline
            minRows={1}
            maxRows={4}
            sx={{
              display: "block",
              marginBottom: 1,
              "& .MuiInputBase-root": {
                borderBottom: "1px solid #ccc", // Mimicking the underline style
              },
            }}
            onKeyDown={(e) => handleKeyDown(e, index)} // Listen for "Enter" or "Delete" key press
            inputRef={(el) => (bulletPointRefs.current[index] = el)} // Assign ref to each bullet point input
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Circle sx={{ color: "#888", fontSize: 8 }} />{" "}
                  {/* Bullet point icon */}
                </InputAdornment>
              ),
              style: {
                resize: "none", // Prevent manual resize
              },
            }}
          />
        ))}
      </Box>

      {/* Suggested bullet points as Chips */}
      <Stack spacing={1}>
        {suggestions?.suggestions !== undefined &&
          suggestions.suggestions.map((suggestion, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "aliceblue",
                cursor: "pointer",
                p: 0.5,
                borderRadius: 15,
              }}
              onClick={() => handleAddSuggestion(suggestion)}
            >
              <Typography variant="body2">• {suggestion}</Typography>
            </Box>
          ))}
      </Stack>
    </Box>
  );
};

export default ExperienceStep;
