import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalWrapper } from "./ModalWrapper";
import { EditCVForm } from "./EditCVForm";
import { RootState } from "../../store/store";
import { setCV } from "../../store/editFormSlice";
import { setIsEditFormModalOpen } from "../../store/uiSlice";

export const EditCVModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.ui.isEditFormModalOpen
  );

  const handleClose = () => {
    dispatch(setIsEditFormModalOpen(false));
    dispatch(setCV(undefined));
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      <EditCVForm />
    </ModalWrapper>
  );
};

