import { Box, Modal } from "@mui/material";
import React from "react";

interface IModalBoxProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  children: React.ReactNode;
}

export const ModalBox: React.FC<IModalBoxProps> = ({
  isModalOpen,
  handleCloseModal,
  children,
}) => {
  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          height: "85vh",
          transform: "translate(-50%, -50%)",
          width: "90vw",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          maxHeight: "80vh",
          maxWidth: "85vw",
          overflowY: "hidden",
          paddingTop: 10,
          paddingLeft: 5,
          paddingRight: 10,
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};
