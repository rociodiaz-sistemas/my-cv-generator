import {
  Box,
  Chip,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStringField } from "../../../store/formSlice";
import { RootState } from "../../../store/store";
import SwapInput from "../../SwapInput";
import { Add, HelpOutline } from "@mui/icons-material";
import {
  addCurrentKnownFor,
  removeCurrentKnownFor,
} from "../../../store/suggestionsSlice";

const SetupStep: React.FC = () => {
  const dispatch = useDispatch();
  const { formTitle, formJobTitle } = useSelector(
    (state: RootState) => state.formData
  );
  const { profileJobTitle } = useSelector((state: RootState) => state.profile);

  const { jobTitleSuggestion, company } = useSelector(
    (state: RootState) => state.suggestions
  );
  const knownFor = useSelector((state: RootState) => state.profile.knownFor);
  const currentKnownFor = useSelector(
    (state: RootState) => state.suggestions.currentKnownFor
  );

  // If formJobTitle is empty, initialize it with the jobTitleSuggestion
  useEffect(() => {
    if (!formJobTitle && jobTitleSuggestion) {
      dispatch(
        updateStringField({ field: "formJobTitle", value: jobTitleSuggestion })
      );
    }
    if (!formTitle && company) {
      dispatch(updateStringField({ field: "formTitle", value: company }));
    }
  }, [jobTitleSuggestion, formJobTitle, company, formTitle, dispatch]);

  // Handle input field changes
  const handleFieldChange =
    (field: keyof RootState["formData"]) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      dispatch(updateStringField({ field, value }));
    };

  // Toggle the keyword between currentKnownFor (enabled) and not (disabled)
  const handleToggleKnownFor = (keyword: string) => {
    if (currentKnownFor.includes(keyword)) {
      dispatch(removeCurrentKnownFor(keyword)); // Remove from selected (disabled)
    } else {
      dispatch(addCurrentKnownFor(keyword)); // Add to selected (enabled)
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 5 }}>
        <TextField
          label="CV Name"
          value={formTitle}
          onChange={handleFieldChange("formTitle")}
          fullWidth
        />
        <SwapInput
          label="Job Title"
          helperTextA="Using the AI-suggested job title"
          helperTextB="Using your default title"
          valueA={jobTitleSuggestion} // jobTitleSuggestion is the default title
          valueB={profileJobTitle} // profileJobTitle is the suggested title
          selectedValue={formJobTitle} // Controlled value is formJobTitle
          onChange={(newValue: string) => {
            dispatch(
              updateStringField({ field: "formJobTitle", value: newValue })
            );
          }} // Update formJobTitle in Redux on change
        />

        <Stack
          spacing={1}
          sx={{ marginTop: 2 }}
          direction="row"
          alignItems="center"
        >
          <Typography variant="body1">
            What you'd like employers to know about you
          </Typography>
          <Tooltip title="These keywords have been selected by you and are used to create your introduction">
            <IconButton size="small">
              <HelpOutline fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack direction="row" flexWrap="wrap" spacing={0} gap={1}>
          {knownFor.map((keyword) => (
            <Chip
              key={keyword}
              label={keyword}
              onClick={() => handleToggleKnownFor(keyword)}
              sx={{
                backgroundColor: currentKnownFor.includes(keyword)
                  ? "primary.main" // Enabled: primary color
                  : "grey.200", // Disabled: grey background
                color: currentKnownFor.includes(keyword)
                  ? "white" // Enabled: white text
                  : "text.primary", // Disabled: faded text
                borderColor: currentKnownFor.includes(keyword)
                  ? "primary.main"
                  : "grey.400", // Border color for enabled vs disabled
                opacity: currentKnownFor.includes(keyword) ? 1 : 0.8, // Full opacity when enabled, faded opacity when disabled
              }}
              icon={
                !currentKnownFor.includes(keyword) ? (
                  <Add sx={{ color: "primary.main", fontSize: 24 }} /> // Add icon for disabled state
                ) : undefined
              }
              onDelete={
                currentKnownFor.includes(keyword)
                  ? () => handleToggleKnownFor(keyword)
                  : undefined
              }
              variant={
                currentKnownFor.includes(keyword) ? "filled" : "outlined"
              } // Filled when enabled, outlined when disabled
            />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default SetupStep;
