// CVStepper.tsx
import React from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { incrementStep, decrementStep, resetStep } from "../../store/uiSlice";
import { addCV, clearFormData } from "../../store/cvSlice";
import CVStep from "./CVStep";

const CVStepper: React.FC = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector((state: RootState) => state.ui.activeStep);
  const formData = useSelector((state: RootState) => state.cv.formData);
  const formFields = Object.keys(formData) as Array<keyof typeof formData>;

  const handleNext = () => {
    dispatch(incrementStep());
  };

  const handleBack = () => {
    dispatch(decrementStep());
  };

  const handleSubmit = () => {
    dispatch(addCV());
    dispatch(resetStep());
    dispatch(clearFormData());
  };

  return (
    <Container>
      <Stepper activeStep={activeStep} alternativeLabel>
        {formFields.map((field) => (
          <Step key={field}>
            <StepLabel>{field}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ padding: 2 }}>
        {formFields.map((field, index) =>
          activeStep === index ? (
            <CVStep key={field} label={field} field={field} />
          ) : null
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          {activeStep === formFields.length - 1 ? (
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default CVStepper;
