import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const SetupStep: React.FC = () => {
  return (
    <>
      <Typography variant="h5">CV Details</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 5 }}>
        <TextField label="CV Name" fullWidth />
        <TextField label="Job Title" fullWidth />
        <Typography>Found Keywords</Typography>
      </Box>
    </>
  );
};

export default SetupStep;
