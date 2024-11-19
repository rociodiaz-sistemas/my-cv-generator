import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import PDFPreview from "./PDFPreview";
import CVTable from "./CVTable";
import { openModal } from "../store/uiSlice";
import FormModal from "./multistep/FormModal";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const { selectedCV } = useSelector((state: RootState) => state.cv);
  const handleOpenModal = () => {
    dispatch(openModal());
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
        <FormModal />
        {selectedCV && <PDFPreview selectedCV={selectedCV} />}
      </Container>
    </>
  );
};

export default Home;
