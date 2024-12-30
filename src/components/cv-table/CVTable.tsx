import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store"; // Ensure correct path to RootState
import useFetchCVs from "../../hooks/useCvs";
import { CVRow } from "./CVRow";

const CVTable: React.FC = () => {
  useFetchCVs();
  const { cvs } = useSelector((state: RootState) => state.cv);

  return (
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
            <CVRow cv={cv} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CVTable;
