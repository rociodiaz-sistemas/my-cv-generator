import { Box, Typography, Chip, Stack } from "@mui/material";
import React from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

const ExpandableHelper: React.FC<{ isExpanded: boolean }> = ({
  isExpanded,
}) => {
  const jobPosting = useSelector(
    (state: RootState) => state.formData.jobPosting
  );
  const keyAttributes = useSelector(
    (state: RootState) => state.suggestions.KeyAttributes
  );

  return (
    <Box
      sx={{
        marginLeft: "2rem",
        height: "80%",
        width: isExpanded ? "60%" : "0%",
        maxWidth: "20vw",
        display: "block",
        wordBreak: "break-word",
        padding: "1rem",
        overflow: "auto",
        transition: "width 0.3s",
        borderLeft: isExpanded ? "1px solid #ccc" : "none",
      }}
    >
      <Typography variant="h6">Job Posting</Typography>
      <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
        {jobPosting}
      </Typography>

      <Typography variant="h6">Key Attributes</Typography>
      {keyAttributes && (
        <Box>
          {Object.entries(keyAttributes).map(([key, values]) => (
            <Box key={key} sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                sx={{ textTransform: "capitalize" }}
              >
                {key.replace(/([A-Z])/g, " $1")}
              </Typography>
              <Stack direction="row" flexWrap="wrap" spacing={1} gap={1}>
                {values.map((value: string, index: number) => (
                  <Chip
                    key={index}
                    sx={{ marginLeft: 0 }}
                    label={value}
                    color="primary"
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ExpandableHelper;
