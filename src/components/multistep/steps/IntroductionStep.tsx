import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateStringField } from "../../../store/formSlice";
import { createIntroductionPrompt } from "../../../prompts";
import { useAIResponse } from "../../../hooks/useAIResponses";
import { setIntroductionSuggestions } from "../../../store/suggestionsSlice";
import Loading from "../../Loading";
import withLoading from "../../withLoading";

const IntroductionStep: React.FC = () => {
  const dispatch = useDispatch();

  const profileIntroduction = useSelector(
    (state: RootState) => state.profile.profileIntroduction
  );
  const knownFor = useSelector((state: RootState) =>
    state.profile.profileSkills.soft.length > 0
      ? state.profile.profileSkills.soft
      : []
  );
  const candidateSkills = useSelector(
    (state: RootState) => state.profile.profileSkills
  );
  const keyAttributes = useSelector(
    (state: RootState) => state.suggestions.KeyAttributes
  );
  const jobPostingTips = useSelector(
    (state: RootState) => state.suggestions.jobPostingTips
  );
  const jobTitle = useSelector(
    (state: RootState) => state.formData.formJobTitle
  );
  const toneOfJobPosting = useSelector(
    (state: RootState) => state.suggestions.toneOfJobPosting
  );
  const formIntroduction = useSelector(
    (state: RootState) => state.formData.formIntroduction
  );
  const introductionSuggestions = useSelector(
    (state: RootState) => state.suggestions.introductionSuggestions
  );

  const [tipMessage, setTipMessage] = useState("");

  const { data, isLoading } = useAIResponse(
    createIntroductionPrompt(
      profileIntroduction,
      jobTitle,
      `6`,
      jobPostingTips,
      keyAttributes,
      candidateSkills,
      toneOfJobPosting,
      knownFor
    ),
    introductionSuggestions !== undefined
  );

  useEffect(() => {
    if (data && data.choices && data.choices.length > 0 && !isLoading) {
      try {
        const responseContent = data.choices[0]?.message?.content;
        if (responseContent) {
          const parsedData = JSON.parse(responseContent);
          dispatch(setIntroductionSuggestions(parsedData.introductions));
        }
      } catch (error) {
        console.error("Error parsing response content:", error);
      }
    }
  }, [data, dispatch, isLoading]);

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

  const handleUseSuggestedIntroduction = (suggestion: string) => {
    dispatch(
      updateStringField({
        field: "formIntroduction",
        value: suggestion,
      })
    );
  };

  const copyToClipboard = (sentence: string) => {
    navigator.clipboard.writeText(sentence);
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
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        <Typography variant="h6">AI Suggestions</Typography>
        {introductionSuggestions?.map((suggestion, index) => (
          <Stack direction="row" spacing={2} alignItems="center">
            <Box key={index} sx={{ padding: 1, flex: 5 }}>
              {suggestion.split(/[.!?]/).map((sentence, sentenceIndex) => (
                <Box
                  key={`${index}-${sentenceIndex}`}
                  onClick={() => copyToClipboard(sentence.trim())}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "yellow",
                    },
                    padding: "2px 0",
                  }}
                >
                  {sentence.trim() && (
                    <Typography variant="body1">{sentence.trim()}.</Typography>
                  )}
                </Box>
              ))}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Button
                onClick={() => handleUseSuggestedIntroduction(suggestion)}
                variant="outlined"
              >
                USE
              </Button>
            </Box>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default withLoading(IntroductionStep, {
  whatItsLoading: "your resume introduction",
});
