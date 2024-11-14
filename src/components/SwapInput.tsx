import React, { useMemo, useState } from "react";
import { TextField, IconButton, Tooltip, Box, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

interface SwapInputProps {
  label: string;
  helperTextA: string;
  helperTextB: string;
  valueA: string;
  valueB: string;
  selectedValue: string; // Controlled value (formJobTitle)
  onChange?: (value: string) => void;
}

const SwapInput: React.FC<SwapInputProps> = ({
  label,
  helperTextA,
  helperTextB,
  valueA,
  valueB,
  selectedValue, // Controlled value (formJobTitle)
  onChange,
}) => {
  const isValueADefault = useMemo(
    () => selectedValue === valueA,
    [selectedValue, valueA]
  );
  // Toggle function to switch between valueA and valueB
  const handleToggle = () => {
    const newValue = isValueADefault ? valueB : valueA;
    if (onChange) onChange(newValue);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}
    >
      <TextField
        label={label}
        variant="outlined"
        value={selectedValue} // Always use selectedValue (formJobTitle)
        onChange={(e) => {
          if (onChange) onChange(e.target.value); // Directly update formJobTitle from input
        }}
        fullWidth
        helperText={isValueADefault ? helperTextA : helperTextB}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton color="primary" onClick={handleToggle}>
          <SwapHorizIcon />
        </IconButton>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {isValueADefault ? "Switch to default" : "Switch to suggested "}
        </Typography>
      </Box>
    </Box>
  );
};

export default SwapInput;
