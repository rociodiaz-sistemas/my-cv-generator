import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const Loading: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      minHeight="200px"
      gap={2}
    >
      {/* Circular Progress with Icon */}
      <Box position="relative" display="inline-flex">
        <CircularProgress size={60} thickness={4} />
        <Box
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <AutoAwesomeIcon fontSize="large" color="primary" />
        </Box>
      </Box>

      {/* Friendly Loading Message */}
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        sx={{ maxWidth: "80%" }}
      >
        Hang tight! Our AI is working its magic to enhance your resume and make
        it shine ✨.
      </Typography>
    </Box>
  );
};

export default Loading;
