import {
  Button,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateStringField } from "../../../store/formSlice";
import { AutoFixHigh } from "@mui/icons-material";

const IntroductionStep: React.FC = () => {
  const dispatch = useDispatch();

  const profileIntroduction = useSelector(
    (state: RootState) => state.profile.profileIntroduction
  );

  const formIntroduction = useSelector(
    (state: RootState) => state.formData.formIntroduction
  );
  const introductionSuggestion = useSelector(
    (state: RootState) => state.suggestions.introductionSuggestion
  );

  const [tipMessage, setTipMessage] = useState("");

  useEffect(() => {
    if (!formIntroduction) {
      dispatch(
        updateStringField({
          field: "formIntroduction",
          value: profileIntroduction,
        })
      );
    }
  }, [formIntroduction, dispatch]);

  const handleFieldChange =
    (field: keyof RootState["formData"]) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      dispatch(updateStringField({ field, value }));

      // Check for length and sentence count
      const wordCount = value.split(/\s+/).filter((word) => word).length;
      const sentenceCount = value
        .split(/[.!?]/)
        .filter((sentence) => sentence.trim().length).length;

      if (wordCount > 80 || sentenceCount > 10) {
        setTipMessage(
          "TIP: It's best to keep your introduction max 30–80 words or 3-5 sentences."
        );
      } else {
        setTipMessage("");
      }
    };

  const handleUseSuggestedIntroduction = () => {
    dispatch(
      updateStringField({
        field: "formIntroduction",
        value: introductionSuggestion,
      })
    );
  };

  return (
    <>
      <TextField
        fullWidth
        multiline
        rows={6}
        value={formIntroduction}
        onChange={handleFieldChange("formIntroduction")}
        placeholder="Write a brief introduction (max 50 words or 3 sentences)"
      />
      {tipMessage && (
        <Typography color="primary.main" variant="body2" sx={{ marginTop: 1 }}>
          {tipMessage}
        </Typography>
      )}
      <Stack spacing={1} sx={{ marginTop: 2 }}>
        <Link
          onClick={handleUseSuggestedIntroduction}
          sx={{ display: "flex", gap: 1, cursor: "pointer" }}
        >
          <AutoFixHigh />
          <Typography variant="body2">Use Suggested Introduction:</Typography>
        </Link>
        <Typography variant="body1">{introductionSuggestion}</Typography>
      </Stack>
    </>
  );
};

export default IntroductionStep;
