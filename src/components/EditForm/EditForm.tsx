import { Box, Container, Grid, IconButton, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditFormModalOpen } from "../../store/uiSlice";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { ExpandableOverview } from "./ExpandableOverView";
import { CV } from "../../store/types";
import { RootState } from "../../store/store";
import { EditFormContent } from "./EditFormContent";
import { setCV } from "../../store/editFormSlice";
import EditSplitSaveButton from "./EditSplitSaveButton";

interface EditFormProps {
  open: boolean;
  cvId: string;
}

export const EditForm: React.FC<EditFormProps> = ({ cvId, open }) => {
  const dispatch = useDispatch();
  const [isOverviewExpanded, setIsOverviewExpanded] = React.useState(true);
  const handleCloseModal = () => {
    dispatch(setIsEditFormModalOpen(false));
  };
  const CV = useSelector((state: RootState) =>
    state.cv.cvs.find((cv: CV) => cv.id === cvId)
  );

  useEffect(() => {
    dispatch(setCV(CV));
  }, [CV, dispatch, useSelector]);

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          height: "85vh",
          transform: "translate(-50%, -50%)",
          width: "90vw",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          maxHeight: "80vh",
          maxWidth: "85vw",
          overflowY: "hidden",
          paddingTop: 10,
          paddingLeft: 5,
          paddingRight: 10,
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          {/* Right: Form content with expandable section */}
          <Grid
            item
            xs={12}
            sm={8}
            md={12} // Change size based on expansion state
            sx={{
              transition: "all 0.3s ease",
              paddingLeft: 2,
              height: "100%",
            }}
          >
            <Container
              sx={{
                width: "100%",
                height: "90%",
                maxHeight: "90%",
                overflow: "auto",
                paddingTop: 2,
              }}
            >
              {CV && <EditFormContent />}
            </Container>
            <EditSplitSaveButton />
          </Grid>
        </Grid>

        {/* Expandable Section */}
        {isOverviewExpanded && CV && (
          <ExpandableOverview isExpanded={isOverviewExpanded} />
        )}
        {/* Button to toggle expansion */}
        <Box sx={{ position: "absolute", top: "50%", right: "5px" }}>
          <IconButton onClick={() => setIsOverviewExpanded((prev) => !prev)}>
            {isOverviewExpanded ? (
              <ArrowForward fontSize="large" />
            ) : (
              <ArrowBack fontSize="large" />
            )}
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};
