import React, { useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store"; // Ensure correct path to RootState
import { deleteCV, selectCV, clearSelectedCV, setCVs } from "../store/cvSlice";
import { pdf } from "@react-pdf/renderer";
import CVTemplate from "./CVTemplate";
import {
  Visibility,
  VisibilityOff,
  Download as DownloadIcon,
  Delete,
} from "@mui/icons-material";

const CVTable: React.FC = () => {
  const dispatch = useDispatch();
  const { cvs, selectedCV } = useSelector((state: RootState) => state.cv);
  console.log(selectedCV);

  const handleSelectCv = (id: string) => {
    console.log(selectedCV);
    if (!selectedCV || selectedCV.id !== id) {
      dispatch(selectCV(id));
    } else {
      dispatch(clearSelectedCV());
    }
  };

  const handleDeleteCv = (id: string) => {
    dispatch(deleteCV(id));
  };

  const handleDownload = async () => {
    if (selectedCV) {
      const blob = await pdf(<CVTemplate selectedCV={selectedCV} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedCV.title}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    const storedCVs = JSON.parse(localStorage.getItem("cvs") || "[]");
    console.log(storedCVs);
    dispatch(setCVs(storedCVs));
  }, [dispatch]);

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
            <TableRow
              sx={{
                backgroundColor:
                  selectedCV?.id === cv.id ? "#d1e3f4" : "inherit",
              }}
              key={cv.id}
            >
              <TableCell onClick={() => handleSelectCv(cv.id)}>
                {cv.cvPDFName}
              </TableCell>
              <TableCell onClick={() => handleSelectCv(cv.id)}>
                {cv.date}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleSelectCv(cv.id)}>
                  {selectedCV?.id === cv.id ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </Button>
                <Button onClick={handleDownload}>
                  <DownloadIcon />
                </Button>
                <Button onClick={() => handleDeleteCv(cv.title)}>
                  <Delete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CVTable;
