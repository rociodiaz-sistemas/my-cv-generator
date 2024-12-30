import React, { useMemo } from "react";
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
import { useModal } from "../../hooks/useModal";
import { setSelectedTableCV } from "../../store/uiSlice";
import CVModals from "./CVModals";

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

  const memoizedCVRows = useMemo(() => {
    return cvs.map((cv) => (
      <CVRow
        key={cv.id}
        cv={cv}
        onEdit={() => handleEditForm(cv)}
        onPreview={() => handlePreview(cv)}
      />
    ));
  }, [cvs]);

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
          <TableBody>{memoizedCVRows}</TableBody>
        </Table>
      </TableContainer>

      {/* Modals for editing and previewing CV */}
      <CVModals
        isEditFormOpen={editFormModalState.isOpen}
        isPreviewOpen={previewModalState.isOpen}
        onEditFormClose={editFormModalState.closeModal}
        onPreviewClose={previewModalState.closeModal}
      />
    </>
  );
};

export default CVTable;
