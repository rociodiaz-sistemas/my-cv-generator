import React from "react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

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
      <Typography>{formSkills.join(", ")}</Typography>
      <Typography variant="h5">Experiences</Typography>
      <Typography>{formExperiences.join(", ")}</Typography>
    </>
  );
};

export default OverviewStep;
