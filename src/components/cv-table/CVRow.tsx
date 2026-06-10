import { Delete, Download, Edit, Visibility } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import { useModal } from "../../hooks/useModal";
import { useDispatch } from "react-redux";
import { CV } from "../../store/types";
import { setCV } from "../../store/editFormSlice";
import { setIsEditFormModalOpen } from "../../store/uiSlice";
import CVTemplate from "../cv-template/CVTemplate";
import CVTemplateSpanish from "../cv-template/CVTemplateSpanish";
import { pdf } from "@react-pdf/renderer";
import { ModalWrapper } from "../modals/ModalWrapper";
import { CVPreviewModal } from "../modals/CVPreviewModal";

interface CVRowProps {
  cv: CV;
}

export const CVRow: React.FC<CVRowProps> = ({ cv }) => {
  const dispatch = useDispatch();
  const previewCVFormModalState = useModal();

  const handleDeleteCv = (cv: CV) => {
    console.log("deleting cv", cv);
  };

  const handleDownloadCV = async (cv: CV) => {
    const blob = await pdf(
      cv.isSpanish ? (
        <CVTemplate selectedCV={cv} />
      ) : (
        <CVTemplateSpanish selectedCV={cv} />
      )
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cv.title}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const ActionButton: React.FC<{
    onClick: () => void;
    icon: React.ReactNode;
  }> = ({ onClick, icon }) => <Button onClick={onClick}>{icon}</Button>;

  const handleEditCv = () => {
    dispatch(setCV(cv));
    dispatch(setIsEditFormModalOpen(true));
  };

  return (
    <>
      <TableRow key={cv.id}>
        <TableCell onClick={() => previewCVFormModalState.openModal()}>
          {cv.title}
        </TableCell>
        <TableCell onClick={() => previewCVFormModalState.openModal()}>
          {cv.date}
        </TableCell>
        <TableCell>
          <ActionButton
            onClick={() => previewCVFormModalState.openModal()}
            icon={<Visibility />}
          />
          <ActionButton
            onClick={() => handleDownloadCV(cv)}
            icon={<Download />}
          />
          <ActionButton onClick={() => handleDeleteCv(cv)} icon={<Delete />} />
          <ActionButton onClick={handleEditCv} icon={<Edit />} />
        </TableCell>
      </TableRow>
      <ModalWrapper
        isOpen={previewCVFormModalState.isOpen}
        onClose={previewCVFormModalState.closeModal}
      >
        <CVPreviewModal cv={cv} />
      </ModalWrapper>
    </>
  );
};
