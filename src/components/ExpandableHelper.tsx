import {
  Box,
  Typography,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { ExpandMore, ExpandLess, HelpOutline } from "@mui/icons-material";

const ExpandableHelper: React.FC<{ isExpanded: boolean }> = ({
  isExpanded,
}) => {
  const jobPosting = useSelector(
    (state: RootState) => state.formData.jobPosting
  );
  const keyAttributes = useSelector(
    (state: RootState) => state.suggestions.KeyAttributes
  );

  const { toneOfJobPosting, jobPostingTips } = useSelector(
    (state: RootState) => state.suggestions
  );

  const qualifications = useSelector(
    (state: RootState) => state.suggestions.qualifications
  );

  // States to manage expand/collapse for each section
  const [isKeyAttributesExpanded, setIsKeyAttributesExpanded] = useState(false);
  const [isJobDescriptionExpanded, setIsJobDescriptionExpanded] =
    useState(false);

  const [isJobTipsExpanded, setIsJobTipsExpanded] = useState(false);
  const [isQualificationsExpanded, setIsQualificationsExpanded] =
    useState(false);

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

      {/* Job Tips Section */}
      <Box sx={{ marginBottom: "1rem", transition: "all 0.3s ease" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1">Tips</Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => setIsJobTipsExpanded((prev) => !prev)}
          >
            {isJobTipsExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Box
          sx={{
            height: isJobTipsExpanded ? "auto" : "0px",
            overflow: "hidden",
            transition: "height 0.3s ease",
          }}
        >
          <Typography variant="body2">{jobPostingTips}</Typography>
          {toneOfJobPosting && (
            <Stack>
              <Typography variant="subtitle2">Tone</Typography>
              <Typography variant="body2">{toneOfJobPosting}</Typography>
            </Stack>
          )}
        </Box>
      </Box>

      {/* Qualifications */}
      <Box sx={{ marginBottom: "1rem", transition: "all 0.3s ease" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1">Qualifications</Typography>
            <Tooltip title="These are the AI detected qualifications.">
              <IconButton size="small">
                <HelpOutline fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <IconButton
            size="small"
            onClick={() => setIsQualificationsExpanded((prev) => !prev)}
          >
            {isQualificationsExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Box
          sx={{
            height: isQualificationsExpanded ? "auto" : "0px",
            overflow: "hidden",
            transition: "height 0.3s ease",
          }}
        >
          {qualifications.map((qualification, index) => (
            <ul key={index}>
              <li>{qualification}</li>
            </ul>
          ))}
        </Box>
      </Box>

      {/* Key Attributes Section */}
      <Box sx={{ marginBottom: "1rem", transition: "all 0.3s ease" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1">Key Attributes</Typography>
            <Tooltip title="These are the AI detected key attributes.">
              <IconButton size="small">
                <HelpOutline fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <IconButton
            size="small"
            onClick={() => setIsKeyAttributesExpanded((prev) => !prev)}
          >
            {isKeyAttributesExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Box
          sx={{
            height: isKeyAttributesExpanded ? "auto" : "0px",
            overflow: "hidden",
            transition: "height 0.3s ease",
          }}
        >
          {keyAttributes &&
            Object.entries(keyAttributes).map(([key, values]) => (
              <Box key={key} sx={{ marginBottom: "1rem" }}>
                <Typography
                  variant="subtitle2"
                  sx={{ textTransform: "capitalize" }}
                >
                  {key.replace(/([A-Z])/g, " $1")}
                </Typography>
                <Stack direction="row" flexWrap="wrap" spacing={0} gap={1}>
                  {values.map((value: string, index: number) => (
                    <Chip key={index} label={value} color="primary" />
                  ))}
                </Stack>
              </Box>
            ))}
        </Box>
      </Box>

      {/* Job Description Section */}
      <Box sx={{ marginBottom: "1rem", transition: "all 0.3s ease" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1">Job Description</Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => setIsJobDescriptionExpanded((prev) => !prev)}
          >
            {isJobDescriptionExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Box
          sx={{
            height: isJobDescriptionExpanded ? "auto" : "0px",
            overflow: "hidden",
            transition: "height 0.3s ease",
          }}
        >
          <Typography variant="body2">{jobPosting}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ExpandableHelper;
