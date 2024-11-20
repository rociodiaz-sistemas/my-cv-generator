import React, { useState, useRef, useEffect } from "react";
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

interface ExperienceStepProps {
  experience: Experience;
}

const ExperienceStep: React.FC<ExperienceStepProps> = ({ experience }) => {
  const dispatch = useDispatch();

  const profileExperiences = useSelector(
    (state: RootState) => state.profile.profileExperiences
  );

  const initialBulletPoints = experience?.bulletPoints ?? [];
  const [bulletPoints, setBulletPoints] =
    useState<string[]>(initialBulletPoints);
  const suggestions = ["suggestion1", "suggestion2"];

  // Refs to store the text input elements
  const bulletPointRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  // Handler for changes in a bullet point input
  const handleBulletPointChange = (index: number, value: string) => {
    const updatedBulletPoints = [...bulletPoints];
    updatedBulletPoints[index] = value; // Update the specific bullet point

    setBulletPoints(updatedBulletPoints);

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
    setBulletPoints(filteredBulletPoints);

    // Dispatch updated bullet points to Redux
    dispatch(
      updateExperienceBulletpoints({
        id: experience.id,
        bulletPoints: filteredBulletPoints,
      })
    );
  }, []); // Empty dependency array to run only on mount

  // Handler to add a suggestion as a bullet point
  const handleAddSuggestion = (suggestion: string) => {
    setBulletPoints((prev) => [...prev, suggestion]); // Add suggestion as a new bullet point

    // Dispatch updated bullet points to Redux
    dispatch(
      updateExperienceBulletpoints({
        id: experience.id,
        bulletPoints: [...bulletPoints, suggestion],
      })
    );
  };

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
      setBulletPoints(profileExperience.bulletPoints ?? []); // Reset to profile experience bullet points
    }
  };

  // Handler for "Enter" key press to add a new bullet point and focus it
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default action (new line)

      // Add a new bullet point when Enter is pressed
      setBulletPoints((prev) => {
        const updated = [...prev, ""]; // Add an empty string for the new bullet point
        return updated;
      });

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
        updatedBulletPoints.splice(index, 1); // Remove bullet point at the index

        // Update the state
        setBulletPoints(updatedBulletPoints);

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

  return (
    <Box>
      {/* Header with title and date */}
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <Typography variant="body2">{experience.title} - </Typography>
        <Typography variant="body2">{experience.dateFrom}</Typography>
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
      <Box sx={{ marginBottom: 2 }}>
        {suggestions.map((suggestion, index) => (
          <Chip
            key={index}
            label={`• ${suggestion}`}
            onClick={() => handleAddSuggestion(suggestion)} // Add suggestion to Redux
            sx={{ margin: 1 }}
          />
        ))}
      </Box>

      {/* Reset Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleReset} // Reset bullet points
        sx={{ marginTop: 2 }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default ExperienceStep;
