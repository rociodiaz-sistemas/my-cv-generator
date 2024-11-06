import React, { useState, useCallback } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Input,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal, resetForm } from "../store/uiSlice";

const AddCVForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    introduction: "",
    web4Realty: "",
    glofy: "",
    weDevelop1: "",
    weDevelop2: "",
    cfotech: "",
    baufest1: "",
    baufest2: "",
    baufest3: "",
    streamCoder: "",
  });

  const dispatch = useDispatch();

  // Using useCallback to optimize handleChange function
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Submit logic
    console.log("Form submitted", formData);
  };

  const handleClose = () => {
    dispatch(closeModal()); // Close the modal
    dispatch(resetForm()); // Reset the form submission state
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add CV
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <Typography variant="h6">CV Title</Typography>
          <Input
            name="title"
            onChange={handleChange}
            value={formData.title}
            placeholder="Enter CV Title"
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Introduction</Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={formData.introduction}
            onChange={handleChange}
            placeholder="Write your introduction here..."
            name="introduction"
          />
        </Box>
        <ExperienceTextField
          title="Lead React Typescript Developer - Web4Realty"
          date="Mar 2024 - May 2024 - US"
          name="web4Realty"
          value={formData.web4Realty}
          onChange={handleChange}
        />

        <ExperienceTextField
          title="React Typescript Developer - Glofy - Droptrack"
          date="October 2023 - February 2024 - US"
          name="glofy"
          value={formData.glofy}
          onChange={handleChange}
        />

        <ExperienceTextField
          title="React Developer - WeDevelop Ingram Spark"
          date="August 2023 - October 2023 - US"
          name="weDevelop1"
          value={formData.weDevelop1}
          onChange={handleChange}
        />

        <ExperienceTextField
          title="React Developer - WeDevelop Outbound Engine"
          date="July 2022 - August 2023 - US"
          name="weDevelop2"
          value={formData.weDevelop2}
          onChange={handleChange}
        />

        <ExperienceTextField
          title="Lead React Developer - CFOTec - Claro"
          date="May 2021 - December 2021 - Argentina"
          name="cfotech"
          value={formData.cfotech}
          onChange={handleChange}
        />

        <ExperienceTextField
          title="React Developer - Baufest Triple A"
          date="June 2019 - May 2021 - Argentina"
          name="baufest1"
          value={formData.baufest1}
          onChange={handleChange}
        />

        <ExperienceTextField
          title="React Developer - Baufest American Logistics"
          date="November 2018 - June 2019 - Argentina"
          name="baufest2"
          value={formData.baufest2}
          onChange={handleChange}
        />

        <ExperienceTextField
          title="Full Stack Developer .NET | Angular - Baufest Camuzzi Gas"
          date="November 2018 - June 2019 - Argentina"
          name="baufest3"
          value={formData.baufest3}
          onChange={handleChange}
        />

        <ExperienceTextField
          title="Frontend Engineer - StreamCoder"
          date="July 2021 - Present - Remote"
          name="streamCoder"
          value={formData.streamCoder}
          onChange={handleChange}
        />

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

interface ExperienceTextFieldProps {
  title: string;
  date: string;
  name: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const ExperienceTextField = ({
  title,
  date,
  name,
  value,
  onChange,
}: ExperienceTextFieldProps) => {
  return (
    <Box mb={2}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle1">{date}</Typography>
      <TextField
        sx={{
          // Add scrolling behavior here
          "& .MuiInputBase-root": {
            maxHeight: 200, // Set max height to control the area size
            overflowY: "auto", // Enable vertical scrolling
          },
        }}
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
        placeholder="Describe your experience here..."
        name={name}
      />
    </Box>
  );
};

export default AddCVForm;
