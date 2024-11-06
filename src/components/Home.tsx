// src/components/Home.tsx

import React from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import Delete from "@mui/icons-material/Delete";

const Home: React.FC = () => {
  // Sample CVs data with dates (this could be fetched or stored from localStorage in the future)
  const cvs = [
    { id: 1, title: "CV for Job A", date: "2024-01-15" },
    { id: 2, title: "CV for Job B", date: "2024-02-10" },
    { id: 3, title: "CV for Job C", date: "2024-03-05" },
  ];

  const handleAddCv = () => {
    // Logic to add a CV will go here
    alert("Add CV button clicked!");
  };

  const handleExportCv = (cvTitle: string) => {
    // Logic to export the CV (could involve creating a PDF)
    alert(`Exporting ${cvTitle}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My CVs
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddCv}>
        Add CV
      </Button>
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
              <TableRow key={cv.id}>
                <TableCell>{cv.title}</TableCell>
                <TableCell>{cv.date}</TableCell>
                <TableCell>
                  <Button onClick={() => handleExportCv(cv.title)}>
                    <DownloadIcon />
                  </Button>
                  <Button onClick={() => handleExportCv(cv.title)}>
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Home;
