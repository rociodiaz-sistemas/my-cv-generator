import React from "react";
import { Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import CVTable from "../components/cv-table/CVTable";
import { openManualModal, openModal } from "../store/uiSlice";
import AddFormModal from "../components/modals/AddFormModal";
import ManualCVFormModal from "../components/modals/ManualCVFormModal";
import { EditCVModal } from "../components/modals/EditCVModal";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleOpenManualModal = () => {
    dispatch(openManualModal());
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ justifyContent: "flex-end", mb: 2 }}
      >
        <Button variant="outlined" onClick={handleOpenManualModal}>
          Build CV manually
        </Button>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          AI CV wizard
        </Button>
      </Stack>
      <CVTable />
      <AddFormModal />
      <ManualCVFormModal />
      <EditCVModal />
    </>
  );
};

export default Home;
