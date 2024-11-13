import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateField } from "../../../store/formSlice";
import { useAIResponse } from "../../../hooks/useAIResponses";
import Loading from "../../Loading";
import { SETUP_TITLE_POSITION_PROMPT } from "../../../prompts";

const SetupStep: React.FC = () => {
  const dispatch = useDispatch();
  const { jobTitle, title, jobPosting } = useSelector(
    (state: RootState) => state.formData
  );
  const prompt = `${SETUP_TITLE_POSITION_PROMPT} ${jobPosting}`;
  const { data, error, isLoading } = useAIResponse(prompt);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  // Update field directly with formatted company name if data is available
  if (data) {
    const responseContent = data.choices?.[0]?.message?.content;
    const [companyName, jobTitle] = responseContent.split(";"); // Extract company name
    const formattedCompanyName = companyName.replace(/\s+/g, "-").trim(); // Format company name
    const formattedJobTitle = `${jobTitle}`; // Format job title
    // Dispatch update action to Redux store directly
    dispatch(updateField({ field: "jobTitle", value: formattedJobTitle }));
    dispatch(updateField({ field: "title", value: formattedCompanyName }));
  }

  // Handler to update each field in the store
  const handleFieldChange =
    (field: keyof RootState["formData"]) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      dispatch(updateField({ field, value })); // Dispatch update action
    };

  return (
    <>
      <Typography variant="h5">CV Details</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 5 }}>
        <TextField
          label="CV Name"
          value={title}
          onChange={handleFieldChange("title")}
          fullWidth
        />
        <TextField
          label="Job Title"
          value={jobTitle}
          onChange={handleFieldChange("jobTitle")}
          fullWidth
        />
        <Typography>Found Keywords</Typography>
      </Box>
    </>
  );
};

export default SetupStep;
