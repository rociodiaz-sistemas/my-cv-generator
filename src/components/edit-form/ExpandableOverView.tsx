import { useSelector } from "react-redux";
import { ExpandableWrapper } from "../expandables/ExpandableWrapper";
import PDFPreview from "../PDFPreview";
import { RootState } from "../../store/store";
import { Box, FormControlLabel, IconButton, Switch } from "@mui/material";
import React, { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export const ExpandableOverview: React.FC = () => {
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(true);
  const FormCV = useSelector((state: RootState) => state.EditForm.CV);
  const [onePageOnly, setOnePageOnly] = useState(false);

  const handleOnePageOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnePageOnly(e.target.checked);
  };

  return (
    <>
      <ExpandableWrapper
        isExpanded={isOverviewExpanded}
        width="100%"
        maxWidth="40vw"
      >
        <h2>Overview</h2>
        <FormControlLabel
          control={
            <Switch checked={onePageOnly} onChange={handleOnePageOnly} />
          }
          label="Show only one page?"
        />
        {FormCV && <PDFPreview onePageOnly={onePageOnly} selectedCV={FormCV} />}
      </ExpandableWrapper>
      {/* Button to toggle expansion */}
      <Box sx={{ position: "absolute", top: "50%", right: "5px" }}>
        <IconButton onClick={() => setIsOverviewExpanded((prev) => !prev)}>
          {isOverviewExpanded ? (
            <ArrowForward fontSize="large" />
          ) : (
            <ArrowBack fontSize="large" />
          )}
        </IconButton>
      </Box>
    </>
  );
};
