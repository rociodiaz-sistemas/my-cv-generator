import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Box from "@mui/material/Box";

interface ReorderableSkillsProps {
  skills: string[];
  onReorder: (updatedSkills: string[]) => void;
}

const SPACING = {
  general: {
    CHIP_GAP: "8px", // Example spacing
  },
};

const COLORS = {
  accentFillBlue: "#007BFF",
  accentBorderBlue: "#0056b3",
};

const ReorderableSkills: React.FC<ReorderableSkillsProps> = ({
  skills,
  onReorder,
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedSkills = Array.from(skills);
    const [reorderedItem] = updatedSkills.splice(result.source.index, 1);
    updatedSkills.splice(result.destination.index, 0, reorderedItem);

    onReorder(updatedSkills);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="skills" direction="horizontal">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: SPACING.general.CHIP_GAP,
              maxWidth: "250px",
            }}
          >
            {skills.map((skill, index) => (
              <Draggable key={skill} draggableId={skill} index={index}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                      display: "flex",
                      backgroundColor: COLORS.accentFillBlue,
                      padding: "5px",
                      fontSize: "15px",
                      border: `1px solid ${COLORS.accentBorderBlue}`,
                      gap: SPACING.general.CHIP_GAP,
                      wordWrap: "nowrap",
                      maxHeight: "20px",
                      color: "white",
                      cursor: "grab",
                    }}
                  >
                    {skill}
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ReorderableSkills;
