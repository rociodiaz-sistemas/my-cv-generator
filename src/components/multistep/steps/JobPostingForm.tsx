import { FormControlLabel, Switch, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setIsSpanish, updateStringField } from "../../../store/formSlice";

const JobPostingForm: React.FC = () => {
  const dispatch = useDispatch();
  const { jobPosting, isSpanish } = useSelector(
    (state: RootState) => state.formData
  );

  const handleSpanishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsSpanish(e.target.checked));
  };

  return (
    <>
      <FormControlLabel
        control={<Switch checked={isSpanish} onChange={handleSpanishChange} />}
        label="Use spanish template"
      />
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
