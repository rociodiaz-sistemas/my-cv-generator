import React, { useEffect, useState } from "react";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import PDFPreview from "../../PDFPreview";
import { PreviewCV } from "../../../store/types";
import { Box, FormControlLabel, Stack, Switch } from "@mui/material";
import { setShowExperienceCount } from "../../../store/formSlice";

const OverviewStep: React.FC = () => {
  const dispatch = useDispatch();
  const {
    formJobTitle,
    formTitle,
    formIntroduction,
    formSkills,
    formExperiences,
    isSpanish,
    showExperienceCount,
  } = useSelector((state: RootState) => state.formData);

  const { isHelperExpanded } = useSelector((state: RootState) => state.ui); // Track the expanded state from the store

  const [previewCV, setPreviewCV] = useState<PreviewCV>({
    jobTitle: "",
    introduction: "",
    skills: {
      soft: [],
      technical: [],
    },
    isSpanish: false,
    experiences: [],
  });

  const [refreshKey, setRefreshKey] = useState(0); // Trigger re-render

  useEffect(() => {
    setPreviewCV({
      jobTitle: formJobTitle || "",
      introduction: formIntroduction || "",
      skills: formSkills || [],
      experiences: formExperiences || [],
      isSpanish: isSpanish,
      showExperienceCount,
    });
  }, [
    formJobTitle,
    formTitle,
    formIntroduction,
    formSkills,
    formExperiences,
    isSpanish,
    showExperienceCount,
  ]);

  useEffect(() => {
    // Whenever the `isHelperExpanded` state changes, trigger a refresh
    setRefreshKey((prevKey) => prevKey + 1);
  }, [isHelperExpanded]);

  return (
    <Box sx={{ height: "60vh" }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showExperienceCount}
              onChange={(event) =>
                dispatch(setShowExperienceCount(event.target.checked))
              }
            />
          }
          label="Show experience numbers"
        />
      </Stack>
      {previewCV && <PDFPreview key={refreshKey} selectedCV={previewCV} />}
    </Box>
  );
};

export default OverviewStep;
