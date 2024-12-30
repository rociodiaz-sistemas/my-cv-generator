import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store"; // Ensure correct path to RootState
import { deleteCV, selectCV, clearSelectedCV } from "../store/cvSlice";
import { pdf } from "@react-pdf/renderer";
import CVTemplate from "./CVTemplate/CVTemplate";
import {
  Visibility,
  VisibilityOff,
  Download as DownloadIcon,
  Delete,
  Edit,
} from "@mui/icons-material";
import CVTemplateSpanish from "./CVTemplate/CVTemplateSpanish";
import { EditFormModal } from "./EditForm/EditFormModal";
import { setIsEditFormModalOpen } from "../store/uiSlice";
import { setCV } from "../store/editFormSlice";
import { CV } from "../store/types";
import useFetchCVs from "../hooks/useCvs";
import { CVPreviewModal } from "./CVPreviewModal";

const CVTable: React.FC = () => {
  const dispatch = useDispatch();
  useFetchCVs();
  const { cvs } = useSelector((state: RootState) => state.cv);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [cvToView, setCVToView] = React.useState({} as CV);

  const handleDeleteCv = (id: string) => {
    dispatch(deleteCV(id));
  };

  const handleDownloadCV = async (id: string) => {
    const selectedCV = cvs.find((cv) => cv.id === id);
    if (!selectedCV) return;
    const blob = await pdf(
      !selectedCV.isSpanish ? (
        <CVTemplate selectedCV={selectedCV} />
      ) : (
        <CVTemplateSpanish selectedCV={selectedCV} />
      )
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedCV.title}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEditCv = (cv: CV) => {
    dispatch(setCV(cv));
    dispatch(setIsEditFormModalOpen(true));
  };

  const handleViewCV = (cv: CV) => {
    setCVToView(cv);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>CV Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cvs.map((cv) => (
            <TableRow key={cv.id}>
              <TableCell onClick={() => handleViewCV(cv)}>{cv.title}</TableCell>
              <TableCell onClick={() => handleViewCV(cv)}>{cv.date}</TableCell>
              <TableCell>
                <Button onClick={() => handleViewCV(cv)}>
                  <Visibility />
                </Button>
                <Button onClick={() => handleDownloadCV(cv.id)}>
                  <DownloadIcon />
                </Button>
                <Button onClick={() => handleDeleteCv(cv.id)}>
                  <Delete />
                </Button>
                <Button onClick={() => handleEditCv(cv)}>
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditFormModal />
      <CVPreviewModal
        cv={cvToView}
        isModalOpen={isViewModalOpen}
        handleCloseModal={handleCloseViewModal}
      />
    </TableContainer>
  );
};

export default CVTable;
