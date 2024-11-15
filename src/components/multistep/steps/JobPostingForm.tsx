import { TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateStringField } from "../../../store/formSlice";

const JobPostingForm: React.FC = () => {
  const dispatch = useDispatch();
  const { jobPosting } = useSelector((state: RootState) => state.formData);

  return (
    <>
      <TextField
        value={jobPosting}
        onChange={(e) =>
          dispatch(
            updateStringField({ field: "jobPosting", value: e.target.value })
          )
        }
        variant="outlined"
        multiline
        rows={14}
        fullWidth
        margin="normal"
      />
    </>
  );
};
export default JobPostingForm;
