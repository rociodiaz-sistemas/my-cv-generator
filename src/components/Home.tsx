// src/components/Home.tsx

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
import { Delete } from "@mui/icons-material";
import { deleteCV, setCVs, selectCV } from "../store/cvSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  // Access the Redux state using useSelector, with RootState for type safety
  const isModalOpen = useSelector((state: RootState) => state.ui.isModalOpen);
  const { cvs, selectedCV } = useSelector((state: RootState) => state.cv);

  const handleSelectCv = (id: string) => {
    dispatch(selectCV(id));
  };

  const handleOpenModal = () => {
    dispatch(openModal()); // Dispatch the openModal action
  };

  const handleCloseModal = () => {
    dispatch(closeModal()); // Dispatch the closeModal action
  };

  useEffect(() => {
    const storedCVs = JSON.parse(localStorage.getItem("cvs") || "[]");
    console.log(storedCVs, "storedCVS");
    dispatch(setCVs(storedCVs));
  }, [dispatch]);

  const handleDeleteCv = (title: string) => {
    dispatch(deleteCV(title));
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
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                  backgroundColor:
                    selectedCV?.id === cv.id ? "#d1e3f4" : "inherit",
                }}
                key={cv.id}
                onClick={() => handleSelectCv(cv.id)}
              >
                <TableCell>{cv.title}</TableCell>
                <TableCell>{cv.date}</TableCell>
                <TableCell>
                  <Button onClick={() => alert(`Exporting ${cv.title}`)}>
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

      {/* Modal for AddCVForm */}
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
            maxHeight: "85vh", // Prevents exceeding the viewport height
            overflowY: "auto", // Enables scrolling if content exceeds maxHeight
            padding: 2,
            p: 4,
          }}
        >
          <AddCVForm />
        </Box>
      </Modal>
    </Container>
  );
};

export default Home;
