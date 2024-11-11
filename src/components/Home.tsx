import React from "react";
import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../store/uiSlice";
import { RootState } from "../store/store";
import { Close } from "@mui/icons-material";
import PDFPreview from "./PDFPreview";
import CVStepper from "./multistep/CVStepper";
import CVTable from "./CVTable";
import { clearForm } from "../store/formSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.ui.isModalOpen);
  const { selectedCV } = useSelector((state: RootState) => state.cv);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(clearForm());
  };

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          My CVs
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          sx={{ float: "right" }}
        >
          Add CV
        </Button>

        <CVTable />
        {selectedCV && <PDFPreview />}
      </Container>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: "70vh",
            transform: "translate(-50%, -50%)",
            width: "80vw",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            maxHeight: "70vh",
            maxWidth: "80vw",
            overflowY: "auto",
            padding: 10,
          }}
        >
          <IconButton sx={{ float: "right" }}>
            <Close onClick={handleCloseModal} />
          </IconButton>
          <CVStepper />
        </Box>
      </Modal>
    </>
  );
};

export default Home;
