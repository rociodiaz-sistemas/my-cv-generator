import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setCVs } from "../../store/cvSlice";
import { setCV } from "../../store/editFormSlice";
import { setIsEditFormModalOpen } from "../../store/uiSlice";
import { db } from "../../db/CVDatabase";
import { v4 as uuidv4 } from "uuid";

const options = ["Save changes", "Save as new"];

export default function EditSplitSaveButton() {
  const dispatch = useDispatch();
  const currentCV = useSelector((state: RootState) => state.EditForm.CV);
  const cvs = useSelector((state: RootState) => state.cv.cvs);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = async () => {
    if (!currentCV) return;

    if (selectedIndex === 0) {
      await db.cvs.put(currentCV);
      dispatch(
        setCVs(cvs.map((cv) => (cv.id === currentCV.id ? currentCV : cv)))
      );
    } else {
      const copiedCV = {
        ...currentCV,
        id: uuidv4(),
        title: `${currentCV.title} - Copy`,
        cvPDFName: `${currentCV.cvPDFName}-copy`,
        date: new Date().toLocaleDateString(),
      };

      await db.cvs.add(copiedCV);
      dispatch(setCVs([...cvs, copiedCV]));
    }

    dispatch(setIsEditFormModalOpen(false));
    dispatch(setCV(undefined));
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (_event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(_event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
