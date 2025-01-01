import React, { useRef, useEffect, useMemo } from "react";
import {
  Box,
  TextField,
  Stack,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Circle } from "@mui/icons-material";
import { editExperienceBulletpoints } from "../../store/editFormSlice";
import { makeSelectBulletPoints } from "../../store/Selectors";
import { Experience } from "../../store/types";
import { RootState } from "../../store/store";

interface ExperienceStepProps {
  experience: Experience;
}

const EditFormExperience: React.FC<ExperienceStepProps> = ({ experience }) => {
  const dispatch = useDispatch();
  const selectBulletPoints = useMemo(() => makeSelectBulletPoints(), []);
  const bulletPoints = useSelector((state: RootState) =>
    selectBulletPoints(state, experience.id)
  );

  // Refs to store the text input elements
  const bulletPointRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  // Handler for changes in a bullet point input
  const handleBulletPointChange = (index: number, value: string) => {
    const updatedBulletPoints = [...bulletPoints];
    updatedBulletPoints[index] = value; // Update the specific bullet point

    // Dispatch updated bullet points to Redux
    dispatch(
      editExperienceBulletpoints({
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
      editExperienceBulletpoints({
        id: experience.id,
        bulletPoints: filteredBulletPoints,
      })
    );
  }, []); // Empty dependency array to run only on mount

  // Handler for "Enter" key press to add a new bullet point and focus it
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default action (new line)

      dispatch(
        editExperienceBulletpoints({
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
          editExperienceBulletpoints({
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

  return (
    <Box>
      {/* Header with title and date */}
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <Typography variant="body1">
          <strong>{experience.title}</strong> -{" "}
        </Typography>
        <Typography variant="body1">
          <strong>{experience.project}</strong> -{" "}
        </Typography>
        <Typography variant="body1">
          <strong>{experience.dateFrom}</strong>
        </Typography>
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
    </Box>
  );
};

export default EditFormExperience;
