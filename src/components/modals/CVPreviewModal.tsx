import React from "react";
import PDFPreview from "../PDFPreview";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const CVPreviewModal: React.FC = () => {
  const cv = useSelector((state: RootState) => state.ui.selectedTableCV);
  return <>{cv && <PDFPreview selectedCV={cv} />}</>;
};
