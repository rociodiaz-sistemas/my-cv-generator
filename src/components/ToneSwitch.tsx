import React, { useState } from "react";
import { Switch, FormControlLabel, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setMatchTone } from "../store/suggestionsSlice";

const ToneSwitch: React.FC = () => {
  const dispatch = useDispatch();
  const { matchTone, toneOfJobPosting } = useSelector(
    (state: RootState) => state.suggestions
  );
  // Handle switch toggle

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMatchTone(event.target.checked)); // Dispatch the action to update the state
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "baseline" }}>
      {/* Switch with label "Match Tone" */}
      <FormControlLabel
        control={
          <Switch
            checked={matchTone}
            onChange={handleToggle}
            name="matchTone"
            color="primary"
          />
        }
        label="Match Tone"
      />

      {/* Example sentence that adjusts based on the switch */}
      <Typography variant="body2" color="textSecondary" mt={2}>
        {matchTone && toneOfJobPosting
          ? `Found tone: ${toneOfJobPosting}`
          : "We will not match the tone of your job posting."}
      </Typography>
    </Box>
  );
};

export default ToneSwitch;
