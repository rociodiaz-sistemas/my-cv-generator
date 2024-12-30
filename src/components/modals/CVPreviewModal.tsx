import React from "react";
import PDFPreview from "../PDFPreview";
import { CV } from "../../store/types";

interface CVPreviewModalProps {
  cv: CV;
}

export const CVPreviewModal: React.FC<CVPreviewModalProps> = ({ cv }) => {
  return (
    <>
      <PDFPreview selectedCV={cv} />
    </>
  );
};
