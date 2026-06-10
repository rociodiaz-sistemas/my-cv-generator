import React, { useState, useEffect, useRef } from "react";
import { pdf } from "@react-pdf/renderer";
import CVTemplate from "./cv-template/CVTemplate";
import { PreviewCV } from "../store/types";
import CVTemplateSpanish from "./cv-template/CVTemplateSpanish";

interface PDFPreviewProps {
  selectedCV: PreviewCV;
  onePageOnly?: boolean;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ selectedCV, onePageOnly }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const isSpanish = selectedCV.isSpanish;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedCVSnapshot = JSON.stringify(selectedCV);

  useEffect(() => {
    let objectUrl = "";
    const generatePdf = async () => {
      if (selectedCV) {
        const blob = await pdf(
          !isSpanish ? (
            <CVTemplate onePageOnly={onePageOnly} selectedCV={selectedCV} />
          ) : (
            <CVTemplateSpanish selectedCV={selectedCV} />
          )
        ).toBlob();
        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      }
    };

    generatePdf();
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [isSpanish, onePageOnly, selectedCVSnapshot]);

  // Resize the iframe when the container size changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (iframeRef.current && containerRef.current) {
        // iframeRef.current.style.height = `${containerRef.current.offsetHeight}px`;
        iframeRef.current.style.width = "100%"; // Ensure full width
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

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
