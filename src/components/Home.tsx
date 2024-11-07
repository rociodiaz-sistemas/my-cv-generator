import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddCVForm from "./AddCVForm";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../store/uiSlice";
import { RootState } from "../store/store";
import { Delete, Visibility, VisibilityOff } from "@mui/icons-material";
import { deleteCV, setCVs, selectCV, clearSelectedCV } from "../store/cvSlice";
import PDFPreview from "./PDFPreview";
import { pdf } from "@react-pdf/renderer";
import CVTemplate from "./CVTemplate";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.ui.isModalOpen);
  const { cvs, selectedCV } = useSelector((state: RootState) => state.cv);

  const handleSelectCv = (id: string) => {
    if (!selectedCV) {
      dispatch(selectCV(id));
    } else {
      dispatch(clearSelectedCV());
    }
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const storedCVs = JSON.parse(localStorage.getItem("cvs") || "[]");
    console.log(storedCVs, "storedCVS");
    dispatch(setCVs(storedCVs));
  }, [dispatch]);

  const handleDeleteCv = (title: string) => {
    dispatch(deleteCV(title));
  };

  const handleDownload = async () => {
    const blob = await pdf(<CVTemplate selectedCV={selectedCV} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedCV?.title}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My CVs
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add CV
      </Button>

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
                <TableCell>{cv.title}</TableCell>
                <TableCell>{cv.date}</TableCell>
                <TableCell>
                  <Button onClick={() => handleSelectCv(cv.id)}>
                    {selectedCV?.id === cv.id ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </Button>
                  <Button onClick={() => handleDownload}>
                    <DownloadIcon />
                  </Button>
                  <Button onClick={() => handleDeleteCv(cv.title)}>
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80vw",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            maxHeight: "85vh",
            overflowY: "auto",
            padding: 2,
            p: 4,
          }}
        >
          <AddCVForm />
        </Box>
      </Modal>
      {selectedCV && <PDFPreview />}
    </Container>
  );
};

export default Home;
