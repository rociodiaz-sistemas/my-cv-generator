import React, { useEffect } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { incrementStep, decrementStep, resetStep } from "../../store/uiSlice";
import { addCV, clearFormData, setFormData } from "../../store/cvSlice";
import CVStepAI from "./CVStepAI";

const CVStepper: React.FC = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector((state: RootState) => state.ui.activeStep);
  const formData = useSelector((state: RootState) => state.cv.formData);
  const formFields = Object.keys(formData) as Array<keyof typeof formData>;

  // Define the prompts for each step
  const prompts = useSelector((state: RootState) => state.cv.prompts);

  // Handle form submission
  const handleSubmit = () => {
    dispatch(addCV());
    dispatch(resetStep());
    dispatch(clearFormData());
  };

  return (
    <Box sx={{ height: "100%" }}>
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
            // Skip AI step for fields that don't require AI, like "title"
            field !== "title" ? (
              <CVStepAI
                key={field}
                label={field}
                field={field}
                prompt={prompts[field]}
              />
            ) : (
              <Box key={field} sx={{ width: "100%" }}>
                <TextField
                  label={`${field}`}
                  fullWidth
                  value={formData[field]}
                  onChange={(e) =>
                    dispatch(setFormData({ [field]: e.target.value }))
                  }
                />
              </Box>
            )
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
            onClick={() => dispatch(decrementStep())}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          {activeStep === formFields.length - 1 ? (
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => dispatch(incrementStep())}
              disabled={!formData[formFields[activeStep]]} // Disable if current field is empty
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CVStepper;
