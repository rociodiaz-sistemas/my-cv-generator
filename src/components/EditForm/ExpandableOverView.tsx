import { useSelector } from "react-redux";
import { ExpandableWrapper } from "../ExpandableWrapper";
import PDFPreview from "../PDFPreview";
import { RootState } from "../../store/store";
import { FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";

interface ExpandableOverviewProps {
  isExpanded: boolean;
}

export const ExpandableOverview: React.FC<ExpandableOverviewProps> = ({
  isExpanded,
}) => {
  const FormCV = useSelector((state: RootState) => state.EditForm.CV);
  const [onePageOnly, setOnePageOnly] = useState(false);

  const handleOnePageOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnePageOnly(e.target.checked);
  };

  return (
    <ExpandableWrapper isExpanded={isExpanded} width="100%" maxWidth="40vw">
      <h2>Overview</h2>
      <FormControlLabel
        control={<Switch checked={onePageOnly} onChange={handleOnePageOnly} />}
        label="Show only one page?"
      />
      {FormCV && <PDFPreview onePageOnly={onePageOnly} selectedCV={FormCV} />}
    </ExpandableWrapper>
  );
};
