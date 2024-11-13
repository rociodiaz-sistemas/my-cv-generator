import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setActiveSubstepIndex } from "../../store/stepSlice";
import { getAlphabetLabel } from "../../helpers";

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
                  <Stepper
                    orientation="vertical"
                    activeStep={activeSubstepIndex}
                    connector={null}
                    sx={{ pl: 1 }}
                  >
                    {steps[mainStep].map((substep, substepIndex) => (
                      <Step
                        key={substep}
                        onClick={() =>
                          dispatch(setActiveSubstepIndex(substepIndex))
                        }
                      >
                        <StepLabel icon={getAlphabetLabel(substepIndex)}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight:
                                activeSubstepIndex === substepIndex
                                  ? "bold"
                                  : "normal",
                              cursor: "pointer",
                            }}
                          >
                            {substep}
                          </Typography>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
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
