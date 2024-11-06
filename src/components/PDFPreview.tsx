import React from "react";
import { pdf } from "@react-pdf/renderer";
import CVTemplate from "./CVTemplate";

const PDFPreview = () => {
  const [pdfUrl, setPdfUrl] = React.useState("");

  const generatePdf = async () => {
    const blob = await pdf(<CVTemplate />).toBlob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  return (
    <div>
      <button onClick={generatePdf}>Generate PDF</button>
      {pdfUrl && <iframe src={pdfUrl} width="100%" height="600px" />}
    </div>
  );
};

export default PDFPreview;
