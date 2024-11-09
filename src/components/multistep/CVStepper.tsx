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

  // Local state for job posting (non-CV data)
  const [jobPosting, setJobPosting] = useState<string>("");

  // Define prompts for AI steps
  const prompts = useSelector((state: RootState) => state.cv.prompts);

  // Handle form submission (excluding jobPosting)
  const handleSubmit = () => {
    dispatch(addCV());
    dispatch(resetStep());
    dispatch(clearFormData());
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {/* Step for non-CV field like Job Posting */}
        <Step key="jobPosting">
          <StepLabel>Job Posting</StepLabel>
        </Step>
        {formFields.map((field) => (
          <Step key={field}>
            <StepLabel>{field}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ padding: 2 }}>
        {/* Step 0: Non-CV field - Job Posting */}
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
          // Conditionally render AI or regular fields based on activeStep
          formFields.map((field, index) =>
            activeStep === index + 1 ? ( // Offset index for job posting step
              field !== "title" ? (
                <CVStepAI
                  key={field}
                  label={field}
                  field={field}
                  prompt={prompts[field]}
                  jobPosting={jobPosting} // Pass jobPosting to AI step
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

        {/* Navigation Buttons */}
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
          {activeStep === formFields.length ? (
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => dispatch(incrementStep())}
              disabled={
                activeStep === 0
                  ? !jobPosting
                  : !formData[formFields[activeStep - 1]]
              } // Validate based on jobPosting or CV field
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
