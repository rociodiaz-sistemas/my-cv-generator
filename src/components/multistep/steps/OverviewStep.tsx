import React from "react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { Box, Chip, Stack, Typography } from "@mui/material";

const OverviewStep: React.FC = () => {
  const {
    jobPosting,
    formJobTitle,
    formTitle,
    formIntroduction,
    formSkills,
    formExperiences,
  } = useSelector((state: RootState) => state.formData);
  return (
    <>
      <Typography variant="h5">CV Name</Typography>
      <Typography>{formTitle}</Typography>
      <Typography variant="h5">Job Title</Typography>
      <Typography>{formJobTitle}</Typography>
      <Typography variant="h5">Introduction</Typography>
      <Typography>{formIntroduction}</Typography>
      <Typography variant="h5">Skills</Typography>
      <Stack direction="row" spacing={1}>
        {formSkills.map((skill, index) => (
          <Chip key={index} label={skill} />
        ))}
      </Stack>
      <Typography variant="h5">Experiences</Typography>
      {formExperiences.map((experience, index) => (
        <Box sx={{ marginBottom: 2 }}>
          {/* Company and Date */}
          <Typography variant="body2" color="textSecondary">
            {experience.company} - {experience.date}
          </Typography>

          {/* Bullet Points */}
          {experience.bulletPoints?.map((point, index) => (
            <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
              {/* Display bullet point with middle dot */}
              <span style={{ marginRight: "8px" }}>•</span>
              {point}
            </Typography>
          ))}
        </Box>
      ))}
    </>
  );
};

export default OverviewStep;
