// SectionWrapper.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, children }) => {
  return (
    <Box
      sx={{
        padding: 1,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default SectionWrapper;
