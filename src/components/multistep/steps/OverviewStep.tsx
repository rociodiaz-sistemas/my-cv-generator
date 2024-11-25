import React, { useEffect, useState } from "react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import PDFPreview from "../../PDFPreview";
import { PreviewCV } from "../../../store/types";
import { Box } from "@mui/material";

const OverviewStep: React.FC = () => {
  const {
    formJobTitle,
    formTitle,
    formIntroduction,
    formSkills,
    formExperiences,
  } = useSelector((state: RootState) => state.formData);

  const { isHelperExpanded } = useSelector((state: RootState) => state.ui); // Track the expanded state from the store

  const [previewCV, setPreviewCV] = useState<PreviewCV>({
    jobTitle: "",
    introduction: "",
    skills: {
      soft: [],
      technical: [],
    },
    experiences: [],
  });

  const [refreshKey, setRefreshKey] = useState(0); // Trigger re-render

  useEffect(() => {
    setPreviewCV({
      jobTitle: formJobTitle || "",
      introduction: formIntroduction || "",
      skills: formSkills || [],
      experiences: formExperiences || [],
    });
  }, [formJobTitle, formTitle, formIntroduction, formSkills, formExperiences]);

  useEffect(() => {
    // Whenever the `isHelperExpanded` state changes, trigger a refresh
    setRefreshKey((prevKey) => prevKey + 1);
  }, [isHelperExpanded]);

  return (
    <Box sx={{ height: "60vh" }}>
      {previewCV && <PDFPreview key={refreshKey} selectedCV={previewCV} />}
    </Box>
  );
};

export default OverviewStep;
