import React from "react";
import PDFPreview from "../PDFPreview";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import withLanguageSwitch from "../cv-template/withLanguageTemplate";

export const CVPreviewModal: React.FC = () => {
  // Wrap PDFPreview with HOC
  const PDFPreviewWithLanguage = withLanguageSwitch(PDFPreview);
  const cv = useSelector((state: RootState) => state.ui.selectedTableCV);
  return <PDFPreviewWithLanguage selectedCV={cv} />;
};
