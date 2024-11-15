import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStringField } from "../../../store/formSlice";
import { RootState } from "../../../store/store";
import SwapInput from "../../SwapInput";

const SetupStep: React.FC = () => {
  const dispatch = useDispatch();
  const { formTitle, formJobTitle } = useSelector(
    (state: RootState) => state.formData
  );
  const { profileJobTitle } = useSelector((state: RootState) => state.profile);

  const { jobTitleSuggestion, company } = useSelector(
    (state: RootState) => state.suggestions
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
      </Box>
    </>
  );
};

export default SetupStep;
