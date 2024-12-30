import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import CVTable from "./CVTable";
import { openModal } from "../store/uiSlice";
import AddFormModal from "./modals/AddFormModal";

const Home: React.FC = () => {
  const dispatch = useDispatch();
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
        <AddFormModal />
      </Container>
    </>
  );
};

export default Home;
