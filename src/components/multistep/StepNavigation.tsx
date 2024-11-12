import React from "react";
import { Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { nextStep, previousStep } from "../../store/stepSlice";

const StepNavigation: React.FC = () => {
  const dispatch = useDispatch();

  // Optional: Select step state if you need to control button visibility or styles
  const { activeMainStep, activeSubstepIndex, mainSteps, steps } = useSelector(
    (state: RootState) => state.step
  );

  // Conditionally enable/disable buttons
  const isLastMainStep = activeMainStep === mainSteps[mainSteps.length - 1];
  const isLastSubstep = activeSubstepIndex === steps[activeMainStep].length - 1;
  const isFirstSubstep = activeSubstepIndex === 0;
  const isFirstMainStep = activeMainStep === mainSteps[0];

  return (
    <Box display="flex" justifyContent="space-between" mt={3}>
      {/* Previous Button */}
      <Button
        onClick={() => dispatch(previousStep())}
        variant="contained"
        disabled={isFirstMainStep && isFirstSubstep}
      >
        Previous
      </Button>

      {/* Next Button */}
      <Button
        onClick={() => dispatch(nextStep())}
        variant="contained"
        color="primary"
        disabled={isLastMainStep && isLastSubstep}
      >
        Next
      </Button>
    </Box>
  );
};

export default StepNavigation;
