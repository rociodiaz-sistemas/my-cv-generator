import { Container, TextField, CircularProgress } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import EditFormExperience from "./EditFormExperience";

export const EditFormContent: React.FC = () => {
  const dispatch = useDispatch();
  const cv = useSelector((state: RootState) => state.ui.selectedTableCV);
  const formCV = useSelector((state: RootState) => state.EditForm.CV);

  const jobTitle = useMemo(() => formCV?.jobTitle, [formCV?.jobTitle]);
  const introduction = useMemo(
    () => formCV?.introduction,
    [formCV?.introduction]
  );

  useEffect(() => {
    if (cv) {
      dispatch({
        type: "editForm/setCV",
        payload: cv,
      });
    }
  }, [cv]); // Run when cv changes

  if (!formCV) {
    // Render a loading spinner or fallback UI
    return (
      <Container
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        fullWidth
        label="Job Title"
        value={jobTitle}
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
        value={introduction}
        onChange={(e) =>
          dispatch({
            type: "editForm/updateCVField",
            payload: { field: "introduction", value: e.target.value },
          })
        }
      />
      {formCV.experiences.map((experience) => (
        <EditFormExperience key={experience.id} experience={experience} />
      ))}
    </Container>
  );
};
