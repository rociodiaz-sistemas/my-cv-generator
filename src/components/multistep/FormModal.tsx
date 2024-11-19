import React from "react";
import { Modal, Box, IconButton, Container, Grid } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closeModal, setIsHelperExpanded } from "../../store/uiSlice";
import { clearForm } from "../../store/formSlice";
import VerticalStepper from "./VerticalStepper";
import StepNavigation from "./StepNavigation";
import FormContent from "./FormContent";
import ExpandableHelper from "../ExpandableHelper";
import { resetSteps } from "../../store/stepSlice";

const FormModal: React.FC = () => {
  const { isModalOpen, isHelperExpanded } = useSelector(
    (state: RootState) => state.ui
  );
  const jobPosting = useSelector(
    (state: RootState) => state.formData.jobPosting
  );
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(resetSteps());
    dispatch(clearForm());
  };

  const toggleExpand = () => {
    dispatch(setIsHelperExpanded(!isHelperExpanded));
  };

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
        <Grid container sx={{ height: "100%" }}>
          {/* Left: Stepper */}
          <Grid item xs={12} sm={4} md={2} sx={{ paddingRight: 2 }}>
            <VerticalStepper />
          </Grid>

          {/* Right: Form content with expandable section */}
          <Grid
            item
            xs={12}
            sm={8}
            md={10} // Change size based on expansion state
            sx={{
              transition: "all 0.3s ease",
              paddingLeft: 2,
            }}
          >
            <Container
              sx={{
                width: "100%",
                height: "80%",
                maxHeight: "90%",
                overflow: "auto",
                paddingLeft: 2,
              }}
            >
              <FormContent />
            </Container>
            <StepNavigation />
          </Grid>
        </Grid>

        {/* Expandable Section */}
        {isHelperExpanded && jobPosting && (
          <ExpandableHelper isExpanded={isHelperExpanded} />
        )}
        {/* Button to toggle expansion */}
        {jobPosting && (
          <Box sx={{ position: "absolute", top: "50%", right: "5px" }}>
            <IconButton onClick={toggleExpand}>
              {isHelperExpanded ? (
                <ArrowForward fontSize="large" />
              ) : (
                <ArrowBack fontSize="large" />
              )}
            </IconButton>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default FormModal;
