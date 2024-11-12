import React from "react";
import { Modal, Box, IconButton, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closeModal } from "../../store/uiSlice";
import { clearForm } from "../../store/formSlice";
import VerticalStepper from "./VerticalStepper";
import StepNavigation from "./StepNavigation";

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
        <IconButton sx={{ float: "right" }} onClick={handleCloseModal}>
          <Close />
        </IconButton>

        <Box sx={{ display: "flex", height: "100%", width: "20%" }}>
          {/* Left: Stepper */}
          <VerticalStepper />

          {/* Right: Form content */}
          <Box sx={{ width: "75%", paddingLeft: 2 }}>
            {/* <DynamicForm /> */}
            <StepNavigation />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 3,
          }}
        ></Box>
      </Box>
    </Modal>
  );
};

export default FormModal;
