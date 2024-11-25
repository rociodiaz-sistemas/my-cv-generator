import React, { useState, useEffect, useRef } from "react";
import { pdf } from "@react-pdf/renderer";
import CVTemplate from "./CVTemplate/CVTemplate";
import { PreviewCV } from "../store/types";

interface PDFPreviewProps {
  selectedCV: PreviewCV;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ selectedCV }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Generate the PDF URL whenever selectedCV changes
  useEffect(() => {
    const generatePdf = async () => {
      if (selectedCV) {
        const blob = await pdf(<CVTemplate selectedCV={selectedCV} />).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    };

    generatePdf();
  }, [selectedCV]);

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
