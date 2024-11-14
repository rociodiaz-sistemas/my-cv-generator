// components/SetupStep.tsx
import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStringField } from "../../../store/formSlice";
import Loading from "../../Loading";
import { useSetupAIResponses } from "../../../hooks/useSetupAIResponses";
import { RootState } from "../../../store/store";

const SetupStep: React.FC = () => {
  const dispatch = useDispatch();
  const { title, jobTitle, KeyAttributes, jobPosting } = useSelector(
    (state: RootState) => state.formData
  );

  // Use the custom hook to handle AI responses, Redux dispatch, etc.
  const { isLoading, error } = useSetupAIResponses(jobPosting);

  // Handle loading and error states
  if (isLoading) return <Loading />;
  if (error) return <div>Error occurred while fetching data!</div>;

  // Handle input field changes
  const handleFieldChange =
    (field: keyof RootState["formData"]) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      dispatch(updateStringField({ field, value }));
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
        {/* Optionally render KeyAttributes values like technicalSkills, etc., */}
        {/* Example: */}
        {/* KeyAttributes.technicalSkills.map(skill => <Typography>{skill}</Typography>) */}
      </Box>
    </>
  );
};

export default SetupStep;
