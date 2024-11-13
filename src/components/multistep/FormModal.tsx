import React from "react";
import { Modal, Box, IconButton, Button, Container } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closeModal } from "../../store/uiSlice";
import { clearForm } from "../../store/formSlice";
import VerticalStepper from "./VerticalStepper";
import StepNavigation from "./StepNavigation";
import FormContent from "./FormContent";

const FormModal: React.FC = () => {
  const isModalOpen = useSelector((state: RootState) => state.ui.isModalOpen);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(clearForm());
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          height: "75vh",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          maxHeight: "80vh",
          maxWidth: "75vw",
          overflowY: "hidden",
          padding: 10,
          paddingBottom: "20px",
        }}
      >
        <IconButton sx={{ float: "right" }} onClick={handleCloseModal}>
          <Close />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%%",
            overflow: "hidden",
          }}
        >
          {/* Left: Stepper */}
          <Box sx={{ width: "25%" }}>
            <VerticalStepper />
          </Box>
          {/* Right: Form content */}
          <Box sx={{ width: "75%", paddingLeft: 2 }}>
            {/* <DynamicForm /> */}
            <Container
              sx={{
                width: "100%",
                height: "80%",
                maxHeight: "90%",
                overflow: "auto",
              }}
            >
              {" "}
              <FormContent />
            </Container>

            <StepNavigation />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormModal;
