import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { AutoFixHigh } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Experience, ExperiencesSuggestions } from "../../../store/types";
import { updateArrayField } from "../../../store/formSlice";

interface ExperienceStepProps {
  experience: Experience;
}

const ExperienceStep: React.FC<ExperienceStepProps> = ({ experience }) => {
  const dispatch = useDispatch();
  // Initial data
  const initialExperience = {
    id: 1,
    bulletpoints: ["whatever", "blabla", "bla"],
  };

  useEffect(() => {}, []);

  const suggestions = ["suggestion1", "suggestion2"];

  const allExperiencesSuggestions = useSelector(
    (state: RootState) => state.suggestions.experiencesSuggestions
  );

  // State to manage bulletpoints inside the textarea
  const [bulletpoints, setBulletpoints] = useState<string[]>(
    initialExperience.bulletpoints
  );

  // State to manage the textarea value
  const [textareaValue, setTextareaValue] = useState<string>(
    (experience.bulletPoints ?? []).map((point) => `• ${point}`).join("\n")
  );

  // Reset function
  const handleReset = () => {
    setBulletpoints(initialExperience.bulletpoints);
    setTextareaValue(
      (experience.bulletPoints ?? []).map((point) => `• ${point}`).join("\n")
    );
  };

  // Handle textarea change
  const handleTextareaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value;
    setTextareaValue(updatedValue);

    // Extract the bulletpoints by splitting by new line and trimming each line
    const updatedBulletpoints = updatedValue
      .split("\n")
      .map((line) => line.replace("•", "").trim())
      .filter(Boolean); // Filter out any empty lines
    setBulletpoints(updatedBulletpoints);
  };

  // Add a suggestion to the bulletpoints
  const handleAddSuggestion = (suggestion: string) => {
    const updatedBulletpoints = [...bulletpoints, suggestion];
    setBulletpoints(updatedBulletpoints);
    setTextareaValue(
      updatedBulletpoints.map((point) => `• ${point}`).join("\n")
    );
  };

  return (
    <Box>
      {/* Textarea for displaying and editing bullet points */}
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <Typography variant="body2">{experience.title} - </Typography>
        <Typography variant="body2">{experience.date}</Typography>
      </Stack>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          label="Experience Details"
          multiline
          fullWidth
          minRows={4}
          value={textareaValue}
          variant="outlined"
          onChange={handleTextareaChange} // Handle input change
          sx={{
            marginBottom: 2,
            fontFamily: "monospace", // Styling for textarea
            whiteSpace: "pre-wrap", // Ensure newlines are respected
            "& .MuiOutlinedInput-root": {
              paddingLeft: 2,
            },
          }}
        />
        <Stack direction="column">
          <Typography variant="body2">Enhance</Typography>
          <IconButton>
            <AutoFixHigh fontSize="large" />
          </IconButton>
        </Stack>
      </Box>

      {/* Display Chips below the textarea for suggested bulletpoints */}
      <Box sx={{ marginBottom: 2 }}>
        {suggestions.map((suggestion, index) => (
          <Stack direction="row" spacing={0} gap={0} key={index}>
            <Chip
              key={index}
              label={`• ${suggestion}`}
              onClick={() => handleAddSuggestion(suggestion)}
              sx={{ margin: 1 }}
            />
          </Stack>
        ))}
      </Box>

      {/* Reset Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleReset}
        sx={{ marginTop: 2 }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default ExperienceStep;
