import { Container, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import EditFormExperience from "./EditFormExperience";

export const EditFormContent: React.FC = () => {
  const dispatch = useDispatch();
  const CV = useSelector((state: RootState) => state.EditForm.CV);

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        fullWidth
        label="Job Title"
        value={CV?.jobTitle}
        onChange={(e) =>
          dispatch({
            type: "editForm/updateCVField",
            payload: { field: "jobTitle", value: e.target.value },
          })
        }
      />

      <TextField
        fullWidth
        label="About me"
        multiline
        rows={7}
        value={CV?.introduction}
        onChange={(e) =>
          dispatch({
            type: "editForm/updateCVField",
            payload: { field: "introduction", value: e.target.value },
          })
        }
      />
      {CV?.experiences.map((experience) => (
        <EditFormExperience key={experience.id} experience={experience} />
      ))}
    </Container>
  );
};
