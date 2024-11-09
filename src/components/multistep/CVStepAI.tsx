import React, { useEffect } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateFormData } from "../../store/cvSlice";
import { useQuery } from "@tanstack/react-query";
import { aiQueryOptions } from "../../hooks/useAIResponses";

interface CVStepProps {
  label: string;
  field: keyof RootState["cv"]["formData"];
  prompt: string; // AI prompt for the query
  jobPosting: string;
}

const CVStepAI: React.FC<CVStepProps> = ({
  label,
  field,
  prompt,
  jobPosting,
}) => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.cv.formData[field]);

  // Use React Query to fetch the AI response for the prompt
  const { data, isLoading, isError, refetch } = useQuery(
    aiQueryOptions(prompt, jobPosting)
  );

  useEffect(() => {
    // Check if new data exists and update the form field
    if (data?.choices?.[0]?.message?.content) {
      const aiResponse = data.choices[0].message.content;
      // Always update the field with the new AI response, regardless of current value
      dispatch(updateFormData({ field, value: aiResponse }));
    }
  }, [data, dispatch, field]); // Trigger effect on data change

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormData({ field, value: event.target.value }));
  };

  // Handle the refresh action to refetch data
  const handleRefresh = () => {
    refetch(); // Manually trigger the refetch
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching AI response</Typography>;

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: 5 }}>
        <Box sx={{ width: "50%" }}>
          <TextField
            label="AI Prompt"
            fullWidth
            multiline
            rows={14}
            value={prompt}
            disabled
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <TextField
            label={`${label} Result`}
            fullWidth
            multiline
            rows={14}
            value={value || ""}
            onChange={handleChange}
          />
        </Box>
      </Box>

      {/* Add a button to refresh the prompt */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="outlined" onClick={handleRefresh}>
          Refresh Prompt
        </Button>
      </Box>
    </Box>
  );
};

export default CVStepAI;
