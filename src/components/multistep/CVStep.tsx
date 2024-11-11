// CVStep.tsx
import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateField } from "../../store/formSlice";

interface CVStepProps {
  label: string;
  field: keyof RootState["formData"];
  multiline?: boolean;
}

const CVStep: React.FC<CVStepProps> = ({ label, field, multiline = false }) => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.formData[field]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateField({ field, value: event.target.value }));
  };

  console.log(label, field, multiline);
  return (
    <Box sx={{ width: "100%", mb: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>

      <TextField
        label={label}
        fullWidth
        multiline={multiline}
        rows={14}
        value={value || ""}
        onChange={handleChange}
      />
    </Box>
  );
};

export default CVStep;
