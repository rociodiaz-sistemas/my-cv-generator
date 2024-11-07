// CVStep.tsx
import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateFormData } from "../../store/cvSlice";

interface CVStepProps {
  label: string;
  field: keyof RootState["cv"]["formData"];
}

const CVStep: React.FC<CVStepProps> = ({ label, field }) => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.cv.formData[field]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormData({ field, value: event.target.value }));
  };

  return (
    <Box sx={{ width: "100%", mb: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <Box sx={{ display: "flex", direction: "row", gap: 5 }}>
        <Box sx={{ width: "50%" }}>
          <TextField
            label={"AI Prompt"}
            fullWidth
            multiline
            rows={14}
            value={value || ""}
            onChange={handleChange}
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

export default CVStep;
