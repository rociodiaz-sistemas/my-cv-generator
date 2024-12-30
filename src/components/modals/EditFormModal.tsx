import { Container, Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExpandableOverview } from "../edit-form/ExpandableOverView";
import { EditFormContent } from "../edit-form/EditFormContent";
import EditSplitSaveButton from "../edit-form/EditSplitSaveButton";
import { ModalBox } from "../ModalBox";
import { RootState } from "../../store/store";
import { setIsEditFormModalOpen } from "../../store/uiSlice";

export const EditFormModal: React.FC = () => {
  const dispatch = useDispatch();
  const isEditFormOpen = useSelector(
    (state: RootState) => state.ui.isEditFormModalOpen
  );
  const handleCloseModal = () => {
    dispatch(setIsEditFormModalOpen(false));
  };

  return (
    <ModalBox isModalOpen={isEditFormOpen} handleCloseModal={handleCloseModal}>
      <Grid container sx={{ height: "100%" }}>
        {/* Right: Form content with expandable section */}
        <Grid
          item
          xs={12}
          sm={8}
          md={12} // Change size based on expansion state
          sx={{
            transition: "all 0.3s ease",
            paddingLeft: 2,
            height: "100%",
          }}
        >
          <Container
            sx={{
              width: "100%",
              height: "90%",
              maxHeight: "90%",
              overflow: "auto",
              paddingTop: 2,
            }}
          >
            <EditFormContent />
          </Container>
          <EditSplitSaveButton />
        </Grid>
      </Grid>
      <ExpandableOverview />
    </ModalBox>
  );
};
