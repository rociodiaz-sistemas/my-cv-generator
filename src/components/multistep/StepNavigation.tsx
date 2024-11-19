import React from "react";
import { Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { nextStep, previousStep } from "../../store/stepSlice";
import { submitForm } from "../../store/uiSlice";
import CVTemplate from "../CVTemplate";
import { CV, PreviewCV } from "../../store/types";
import { pdf } from "@react-pdf/renderer";

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

  const handleSubmit = async () => {
    try {
      setLoadingAddCV(true);
      const createdCV = await dispatch(submitForm()).unwrap();

      setLoadingAddCV(false);
      handleDownload(createdCV);
    } catch (error) {
      setLoadingAddCV(false);
    }
  };

  const handleDownload = async (CV: CV) => {
    if (!CV) return;
    const blob = await pdf(<CVTemplate selectedCV={CV} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${CV.cvPDFName}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
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
