import React from "react";
import { Delete, Download, Edit, Visibility } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import { CV } from "../../store/types";
import CVTemplate from "../cv-template/CVTemplate";
import CVTemplateSpanish from "../cv-template/CVTemplateSpanish";
import { pdf } from "@react-pdf/renderer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { deleteCV } from "../../store/cvSlice";

interface CVRowProps {
  cv: CV;
  onEdit: () => void;
  onPreview: () => void;
}

const CVRow: React.FC<CVRowProps> = React.memo(({ cv, onEdit, onPreview }) => {
  const dispatch = useAppDispatch();
  const handleDeleteCv = (cv: CV) => {
    dispatch(deleteCV(cv.id));
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

  return (
    <TableRow key={cv.id}>
      <TableCell onClick={onPreview}>{cv.title}</TableCell>
      <TableCell onClick={onPreview}>{cv.date}</TableCell>
      <TableCell>
        <ActionButton onClick={onPreview} icon={<Visibility />} />
        <ActionButton
          onClick={() => handleDownloadCV(cv)}
          icon={<Download />}
        />
        <ActionButton onClick={() => handleDeleteCv(cv)} icon={<Delete />} />
        <ActionButton onClick={onEdit} icon={<Edit />} />
      </TableCell>
    </TableRow>
  );
});

export default CVRow;
