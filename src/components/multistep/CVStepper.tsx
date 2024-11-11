import { Stepper, Step, StepLabel, StepContent, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getStepConfig } from "./StepConfig";
import { decrementStep, incrementStep } from "../../store/uiSlice";
const CVFormStepper = () => {
  const dispatch = useDispatch();

  // Getting the current active step from the UI slice
  const activeStep = useSelector((state: RootState) => state.ui.activeStep);

  // Fetching the dynamic steps configuration
  const selectedExperiences = useSelector(
    (state: RootState) => state.ui.selectedExperiences
  );
  const allExperiences = useSelector(
    (state: RootState) => state.profile.allExperiences
  );

  const steps = getStepConfig(selectedExperiences, allExperiences);

  // Logic for handling next and previous step
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      dispatch(incrementStep());
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      dispatch(decrementStep());
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.props?.id}>
            <StepLabel>{step.props?.label}</StepLabel>
            <StepContent>
              {/* Dynamic content of the step */}
              <step.component {...step.props} />

              {/* Navigation buttons */}
              <div>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                <Button onClick={handleNext} variant="contained" sx={{ ml: 1 }}>
                  {index === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CVFormStepper;
