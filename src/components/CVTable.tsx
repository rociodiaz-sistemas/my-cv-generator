import React, { useEffect } from "react";
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
import { deleteCV, selectCV, clearSelectedCV, setCVs } from "../store/cvSlice";
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
import { EditForm } from "./EditForm/EditForm";
import { setIsEditFormModalOpen } from "../store/uiSlice";

const CVTable: React.FC = () => {
  const dispatch = useDispatch();
  const isEditFormOpen = useSelector(
    (state: RootState) => state.ui.isEditFormModalOpen
  );
  const { cvs, selectedCV } = useSelector((state: RootState) => state.cv);
  const [EditCVId, setEditCVId] = React.useState<string>("");

  const handleSelectCv = (id: string) => {
    if (!selectedCV || selectedCV.id !== id) {
      dispatch(selectCV(id));
    } else {
      dispatch(clearSelectedCV());
    }
  };

  const handleDeleteCv = (id: string) => {
    dispatch(deleteCV(id));
  };

  const handleEditCv = (cvId: string) => {
    setEditCVId(cvId);
    dispatch(setIsEditFormModalOpen(true));
  };

  const handleDownload = async (id: string) => {
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

  useEffect(() => {
    const storedCVs = JSON.parse(localStorage.getItem("cvs") || "[]");
    dispatch(setCVs(storedCVs));
  }, [dispatch]);

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
            <TableRow
              sx={{
                backgroundColor:
                  selectedCV?.id === cv.id ? "#d1e3f4" : "inherit",
              }}
              key={cv.id}
            >
              <TableCell onClick={() => handleSelectCv(cv.id)}>
                {cv.title}
              </TableCell>
              <TableCell onClick={() => handleSelectCv(cv.id)}>
                {cv.date}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleSelectCv(cv.id)}>
                  {selectedCV?.id === cv.id ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </Button>
                <Button onClick={() => handleDownload(cv.id)}>
                  <DownloadIcon />
                </Button>
                <Button onClick={() => handleDeleteCv(cv.id)}>
                  <Delete />
                </Button>
                <Button onClick={() => handleEditCv(cv.id)}>
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditForm open={isEditFormOpen} cvId={EditCVId} />
    </TableContainer>
  );
};

export default CVTable;
