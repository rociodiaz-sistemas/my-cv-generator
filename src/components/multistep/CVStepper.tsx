import React, { useState } from "react";
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

  // Local state to store job posting
  const [jobPosting, setJobPosting] = useState<string>("");

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
        <Step key="1">
          <StepLabel></StepLabel>
        </Step>
        {formFields.map((field) => (
          <Step key={field}>
            <StepLabel>{field}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ padding: 2 }}>
        {/* Step 1: Job Posting Input */}
        {activeStep === 0 ? (
          <Box sx={{ width: "100%" }}>
            <TextField
              label="Job Posting"
              fullWidth
              multiline
              rows={6}
              value={jobPosting}
              onChange={(e) => setJobPosting(e.target.value)}
            />
          </Box>
        ) : (
          // Conditionally render AI steps or regular fields
          formFields.map((field, index) =>
            activeStep === index ? (
              field !== "title" ? (
                <CVStepAI
                  key={field}
                  label={field}
                  field={field}
                  prompt={prompts[field]}
                  jobPosting={jobPosting} // Pass the job posting to the AI step
                />
              ) : (
                <Box key={field} sx={{ width: "100%" }}>
                  <TextField
                    label={field}
                    fullWidth
                    value={formData[field]}
                    onChange={(e) =>
                      dispatch(setFormData({ [field]: e.target.value }))
                    }
                  />
                </Box>
              )
            ) : null
          )
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
              disabled={
                !formData[formFields[activeStep]] ||
                (activeStep == 0 && !jobPosting)
              } // Disable if current field is empty
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
