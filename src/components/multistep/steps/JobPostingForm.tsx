import { TextField, Typography } from "@mui/material";
import React from "react";

const JobPostingForm: React.FC = () => {
  return (
    <>
      <Typography variant="h5">Post a job description</Typography>
      <TextField
        variant="outlined"
        multiline
        rows={14}
        fullWidth
        margin="normal"
      />
    </>
  );
};
export default JobPostingForm;
