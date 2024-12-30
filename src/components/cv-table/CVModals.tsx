// CVModals.tsx
import React from "react";
import { ModalWrapper } from "../modals/ModalWrapper";
import { EditCVForm } from "../modals/EditCVForm";
import { CVPreviewModal } from "../modals/CVPreviewModal";

interface CVModalsProps {
  onEditFormClose: () => void;
  onPreviewClose: () => void;
  isEditFormOpen: boolean;
  isPreviewOpen: boolean;
}

const CVModals: React.FC<CVModalsProps> = ({
  onEditFormClose,
  onPreviewClose,
  isEditFormOpen,
  isPreviewOpen,
}) => (
  <>
    {/* Modal for editing CV */}
    {isEditFormOpen && (
      <ModalWrapper isOpen={isEditFormOpen} onClose={onEditFormClose}>
        <EditCVForm />
      </ModalWrapper>
    )}

    {/* Modal for previewing CV */}
    {isPreviewOpen && (
      <ModalWrapper isOpen={isPreviewOpen} onClose={onPreviewClose}>
        <CVPreviewModal />
      </ModalWrapper>
    )}
  </>
);

export default CVModals;
