import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import CVTable from "../components/cv-table/CVTable";
import { openModal } from "../store/uiSlice";
import AddFormModal from "../components/modals/AddFormModal";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <>
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
    </>
  );
};

export default Home;
