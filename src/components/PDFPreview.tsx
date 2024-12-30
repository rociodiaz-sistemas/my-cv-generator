import React, { useState, useEffect, useRef } from "react";
import { pdf } from "@react-pdf/renderer";

interface PDFPreviewProps {
  selectedCV: any;
  TemplateComponent: React.ComponentType<any>; // Template is passed from the HOC
  onePageOnly?: boolean;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({
  selectedCV,
  TemplateComponent,
  onePageOnly,
}) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const generatePdf = async () => {
      if (selectedCV) {
        // Use the TemplateComponent directly, passed by the HOC
        const blob = await pdf(
          <TemplateComponent
            onePageOnly={onePageOnly}
            selectedCV={selectedCV}
          />
        ).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    };

    generatePdf();
  }, [selectedCV, TemplateComponent, onePageOnly]);

  return pdfUrl ? (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <iframe
        ref={iframeRef}
        src={pdfUrl}
        width="100%"
        height="100%"
        style={{ border: "none", transition: "height 0.3s ease" }}
      />
    </div>
  ) : null;
};

export default PDFPreview;
