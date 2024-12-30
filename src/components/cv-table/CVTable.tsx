import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store"; // Ensure correct path to RootState
import useFetchCVs from "../../hooks/useCvs";
import { CV } from "../../store/types";
import CVRow from "./CVRow";
import { ModalWrapper } from "../modals/ModalWrapper";
import { EditCVForm } from "../modals/EditCVForm";
import { CVPreviewModal } from "../modals/CVPreviewModal";
import { useModal } from "../../hooks/useModal";
import { setSelectedTableCV } from "../../store/uiSlice";

const CVTable: React.FC = () => {
  const dispatch = useDispatch();
  useFetchCVs();
  const editFormModalState = useModal();
  const previewModalState = useModal();

  const { cvs } = useSelector((state: RootState) => state.cv);

  const handleEditForm = (cv: CV) => {
    dispatch(setSelectedTableCV(cv));
    editFormModalState.openModal();
  };

  const handlePreview = (cv: CV) => {
    dispatch(setSelectedTableCV(cv));
    previewModalState.openModal();
  };

  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CV Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cvs.map((cv) => (
              <CVRow
                key={cv.id}
                cv={cv}
                onEdit={() => handleEditForm(cv)}
                onPreview={() => handlePreview(cv)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for editing CV */}

      {editFormModalState.isOpen && (
        <ModalWrapper
          isOpen={editFormModalState.isOpen}
          onClose={editFormModalState.closeModal}
        >
          <EditCVForm />
        </ModalWrapper>
      )}
      {/* Modal for previewing CV */}
      {previewModalState.isOpen && (
        <ModalWrapper
          isOpen={previewModalState.isOpen}
          onClose={previewModalState.closeModal}
        >
          <CVPreviewModal />
        </ModalWrapper>
      )}
    </>
  );
};

export default CVTable;
