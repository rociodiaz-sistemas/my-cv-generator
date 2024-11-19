import React from "react";
import { Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { nextStep, previousStep } from "../../store/stepSlice";
import { submitForm } from "../../store/uiSlice";

const StepNavigation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loadingAddCV, setLoadingAddCV] = React.useState(false);

  // Select the current step state from Redux
  const { activeMainStep, activeSubstepIndex, mainSteps } = useSelector(
    (state: RootState) => state.step
  );

  // Check if we're on the last substep of the last main step
  const isLastMainStep = activeMainStep === mainSteps[mainSteps.length - 1];
  const isFirstSubstep = activeSubstepIndex === 0;
  const isFirstMainStep = activeMainStep === mainSteps[0];

  const handleSubmit = () => {
    // Dispatch the submitForm action to save the CV to the database
    setLoadingAddCV(true);
    dispatch(submitForm());
    setLoadingAddCV(false);
  };

  return (
    <Box display="flex" justifyContent="flex-end" mt={3} gap={5}>
      {/* Previous Button */}
      <Button
        onClick={() => dispatch(previousStep())}
        variant="contained"
        disabled={isFirstMainStep && isFirstSubstep}
      >
        Previous
      </Button>

      {/* Next/Submit Button */}
      {!isLastMainStep ? (
        <Button onClick={() => dispatch(nextStep())} variant="contained">
          Next
        </Button>
      ) : (
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loadingAddCV}
        >
          {loadingAddCV ? "Adding CV..." : "Add CV"}
        </Button>
      )}
    </Box>
  );
};

export default StepNavigation;
