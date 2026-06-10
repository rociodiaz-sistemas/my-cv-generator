import {
  Chip,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import EditFormExperience from "./EditFormExperience";
import ChipInput from "../ChipInput";
import { addCVSkill, removeCVSkill } from "../../store/editFormSlice";

export const EditFormContent: React.FC = () => {
  const dispatch = useDispatch();
  const CV = useSelector((state: RootState) => state.EditForm.CV);
  const linkedinText = CV?.linkedinText ?? CV?.linkedin ?? "";
  const linkedinUrl =
    CV?.linkedinUrl ??
    (CV?.linkedin?.startsWith("http://") || CV?.linkedin?.startsWith("https://")
      ? CV.linkedin
      : "");

  const handleAddSkill = (category: "technical" | "soft", skill: string) => {
    dispatch(addCVSkill({ category, skill }));
  };

  const handleRemoveSkill = (
    category: "technical" | "soft",
    skill: string
  ) => {
    dispatch(removeCVSkill({ category, skill }));
  };

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        fullWidth
        label="Full name"
        value={CV?.fullName ?? ""}
        onChange={(e) =>
          dispatch({
            type: "editForm/updateCVField",
            payload: { field: "fullName", value: e.target.value },
          })
        }
      />

      <TextField
        fullWidth
        label="Location"
        value={CV?.location ?? ""}
        onChange={(e) =>
          dispatch({
            type: "editForm/updateCVField",
            payload: { field: "location", value: e.target.value },
          })
        }
      />

      <TextField
        fullWidth
        label="Email"
        value={CV?.email ?? ""}
        onChange={(e) =>
          dispatch({
            type: "editForm/updateCVField",
            payload: { field: "email", value: e.target.value },
          })
        }
      />

      <TextField
        fullWidth
        label="Phone"
        value={CV?.phone ?? ""}
        onChange={(e) =>
          dispatch({
            type: "editForm/updateCVField",
            payload: { field: "phone", value: e.target.value },
          })
        }
      />

      <TextField
        fullWidth
        label="LinkedIn text"
        value={linkedinText}
        onChange={(e) =>
          dispatch({
            type: "editForm/updateCVField",
            payload: { field: "linkedinText", value: e.target.value },
          })
        }
      />

      <TextField
        fullWidth
        label="LinkedIn URL"
        value={linkedinUrl}
        onChange={(e) =>
          dispatch({
            type: "editForm/updateCVField",
            payload: { field: "linkedinUrl", value: e.target.value },
          })
        }
      />

      <TextField
        fullWidth
        label="Website"
        value={CV?.website ?? ""}
        onChange={(e) =>
          dispatch({
            type: "editForm/updateCVField",
            payload: { field: "website", value: e.target.value },
          })
        }
      />

      <Stack spacing={2}>
        <Typography variant="h6">Skills</Typography>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Technical skills</Typography>
          <ChipInput category="technical" onAddSkill={handleAddSkill} />
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {CV?.skills.technical.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => handleRemoveSkill("technical", skill)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
        </Stack>

        <Divider />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Soft skills</Typography>
          <ChipInput category="soft" onAddSkill={handleAddSkill} />
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {CV?.skills.soft.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => handleRemoveSkill("soft", skill)}
                color="secondary"
                variant="outlined"
              />
            ))}
          </Stack>
        </Stack>
      </Stack>

      <TextField
        fullWidth
        label="Job Title"
        value={CV?.jobTitle ?? ""}
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
        value={CV?.introduction ?? ""}
        onChange={(e) =>
          dispatch({
            type: "editForm/updateCVField",
            payload: { field: "introduction", value: e.target.value },
          })
        }
      />

      <FormControlLabel
        control={
          <Switch
            checked={CV?.showExperienceCount !== false}
            onChange={(event) =>
              dispatch({
                type: "editForm/updateCVField",
                payload: {
                  field: "showExperienceCount",
                  value: event.target.checked,
                },
              })
            }
          />
        }
        label="Show number of experiences count"
      />

      {CV?.experiences.map((experience) => (
        <EditFormExperience key={experience.id} experience={experience} />
      ))}
    </Container>
  );
};
