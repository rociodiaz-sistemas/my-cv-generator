import React, { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import CVTemplate from "./CVTemplate";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

const PDFPreview: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const selectedCV = useSelector((state: RootState) => state.cv.selectedCV);

  useEffect(() => {
    const generatePdf = async () => {
      if (selectedCV) {
        const blob = await pdf(<CVTemplate selectedCV={selectedCV} />).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    };
    generatePdf();
  }, [selectedCV]); // Regenerate PDF when selectedCV changes

  return pdfUrl ? <iframe src={pdfUrl} width="100%" height="600px" /> : null;
};

export default PDFPreview;
