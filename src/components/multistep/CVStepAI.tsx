import React, { useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateFormData } from "../../store/cvSlice";
import { useQuery } from "@tanstack/react-query";
import { aiQueryOptions } from "../../hooks/useAIResponses";

interface CVStepProps {
  label: string;
  field: keyof RootState["cv"]["formData"];
  prompt: string; // AI prompt for the query
}

const CVStepAI: React.FC<CVStepProps> = ({ label, field, prompt }) => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.cv.formData[field]);

  // Use React Query to fetch the AI response for the prompt
  const { data, isLoading, isError } = useQuery(aiQueryOptions(prompt));

  useEffect(() => {
    // Once the AI response is fetched, update the form field with the result
    if (data?.choices?.[0]?.message?.content && !value) {
      const aiResponse = data.choices[0].message.content;
      dispatch(updateFormData({ field, value: aiResponse }));
    }
  }, [data, value, dispatch, field]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormData({ field, value: event.target.value }));
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
    </Box>
  );
};

export default CVStepAI;
