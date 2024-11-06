// src/components/Home.tsx

import React from "react";
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

const Home: React.FC = () => {
  const dispatch = useDispatch();
  // Access the Redux state using useSelector, with RootState for type safety
  const isModalOpen = useSelector((state: RootState) => state.ui.isModalOpen);

  // Sample CVs data with dates (this could be fetched or stored from localStorage in the future)
  const cvs = [
    { id: 1, title: "CV for Job A", date: "2024-01-15" },
    { id: 2, title: "CV for Job B", date: "2024-02-10" },
    { id: 3, title: "CV for Job C", date: "2024-03-05" },
  ];

  const handleOpenModal = () => {
    dispatch(openModal()); // Dispatch the openModal action
  };

  const handleExportCv = (cvTitle: string) => {
    // Logic to export the CV (could involve creating a PDF)
    alert(`Exporting ${cvTitle}`);
  };

  const handleCloseModal = () => {
    dispatch(closeModal()); // Dispatch the closeModal action
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
              <TableRow key={cv.id}>
                <TableCell>{cv.title}</TableCell>
                <TableCell>{cv.date}</TableCell>
                <TableCell>
                  <Button onClick={() => alert(`Exporting ${cv.title}`)}>
                    <DownloadIcon />
                  </Button>
                  <Button onClick={() => handleExportCv(cv.title)}>
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
