import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  nextStep,
  previousStep,
  setActiveMainStep,
  setActiveSubstepIndex,
} from "../../store/stepSlice";

const VerticalStepper: React.FC = () => {
  const dispatch = useDispatch();
  const { mainSteps, steps, activeMainStep, activeSubstepIndex } = useSelector(
    (state: RootState) => state.step
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingRight: 2,
      }}
    >
      {/* Main Stepper */}
      <Stepper
        orientation="vertical"
        activeStep={mainSteps.indexOf(activeMainStep)}
      >
        {mainSteps.map((mainStep, mainStepIndex) => (
          <Step key={mainStep}>
            {/* Display the Main Step Label */}
            <StepLabel>
              <Typography variant="h6">
                {mainStep.charAt(0).toUpperCase() + mainStep.slice(1)}
              </Typography>
            </StepLabel>

            {/* Expandable Accordion for Substeps, only visible when main step is active */}
            {activeMainStep === mainStep && steps[mainStep]?.length > 0 && (
              <Accordion expanded={true} square elevation={0}>
                <AccordionDetails>
                  <Box sx={{ ml: 2 }}>
                    {steps[mainStep].map((substep, substepIndex) => (
                      <Typography
                        key={substep}
                        variant="body1"
                        sx={{
                          fontWeight:
                            activeSubstepIndex === substepIndex
                              ? "bold"
                              : "normal",
                          cursor: "pointer",
                          padding: 0.5,
                        }}
                        onClick={() =>
                          dispatch(setActiveSubstepIndex(substepIndex))
                        }
                      >
                        {substep}
                      </Typography>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default VerticalStepper;
