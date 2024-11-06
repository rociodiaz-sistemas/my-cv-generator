import React, { useState } from "react";
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
import AddCVForm from "./components/AddCVForm"; // Import the AddCVForm component
import { Provider } from "react-redux";
import { store } from "./store/store";

const Home: React.FC = () => {
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

  // Sample CVs data with dates (this could be fetched or stored from localStorage in the future)
  const cvs = [
    { id: 1, title: "CV for Job A", date: "2024-01-15" },
    { id: 2, title: "CV for Job B", date: "2024-02-10" },
    { id: 3, title: "CV for Job C", date: "2024-03-05" },
  ];

  const handleAddCv = () => {
    setOpenModal(true); // Open modal when button is clicked
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal
  };

  return (
    <Provider store={store}>
      <Container>
        <Typography variant="h4" gutterBottom>
          My CVs
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddCv}>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal for AddCVForm */}
        <Modal open={openModal} onClose={handleCloseModal}>
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
    </Provider>
  );
};

export default Home;
