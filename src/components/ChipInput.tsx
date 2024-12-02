import React, { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface SkillChipInputProps {
  category: "technical" | "soft";
  onAddSkill: (category: "technical" | "soft", skill: string) => void; // Use the category and input string
}

const SkillChipInput: React.FC<SkillChipInputProps> = ({
  category,
  onAddSkill,
}) => {
  const [input, setInput] = useState("");

  const handleAddSkill = () => {
    if (input.trim()) {
      onAddSkill(category, input.trim()); // Pass category and input value
      setInput(""); // Clear input field
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "25px",
        padding: "1px 8px",
        gap: 1,
        flexWrap: "wrap",
        "&:focus-within": {
          borderColor:
            category === "technical" ? "primary.main" : "secondary.main",
          boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <InputBase
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Add a ${category} skill`}
        sx={{
          flexGrow: 1,
          fontSize: "12px",
          padding: "1px",
          minWidth: "60px",
        }}
        onKeyDown={handleKeyDown}
      />
      <IconButton size="small" onClick={handleAddSkill}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default SkillChipInput;
