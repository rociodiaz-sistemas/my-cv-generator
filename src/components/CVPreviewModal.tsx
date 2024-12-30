import React from "react";
import { ModalBox } from "./ModalBox";
import PDFPreview from "./PDFPreview";
import { CV } from "../store/types";

interface CVPreviewModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  cv: CV;
}

export const CVPreviewModal: React.FC<CVPreviewModalProps> = ({
  isModalOpen,
  handleCloseModal,
  cv,
}) => {
  return (
    <>
      <ModalBox
        isModalOpen={isModalOpen}
        handleCloseModal={() => handleCloseModal()}
      >
        <PDFPreview selectedCV={cv} />
      </ModalBox>
    </>
  );
};
