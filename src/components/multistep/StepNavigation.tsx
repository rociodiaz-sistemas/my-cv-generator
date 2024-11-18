import React from "react";
import { Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { nextStep, previousStep } from "../../store/stepSlice";
import { addCV } from "../../store/cvSlice";

const StepNavigation: React.FC = () => {
  const dispatch = useDispatch();

  // Select the current step state from Redux
  const { activeMainStep, activeSubstepIndex, mainSteps, steps } = useSelector(
    (state: RootState) => state.step
  );

  // Check if we're on the last substep of the last main step
  const isLastMainStep = activeMainStep === mainSteps[mainSteps.length - 1];
  const isLastSubstep = activeSubstepIndex === steps[activeMainStep].length - 1;
  const isFirstSubstep = activeSubstepIndex === 0;
  const isFirstMainStep = activeMainStep === mainSteps[0];

  const handleSubmit = () => {
    // Dispatch the addCV action to save the CV to the database
    dispatch(addCV());
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
      <Button
        onClick={
          isLastMainStep && isLastSubstep
            ? handleSubmit
            : () => dispatch(nextStep())
        }
        variant="contained"
        color="primary"
        disabled={isLastMainStep && isLastSubstep && false} // Always enable submit if it's the last step
      >
        {isLastMainStep && isLastSubstep ? "Submit" : "Next"}
      </Button>
    </Box>
  );
};

export default StepNavigation;
