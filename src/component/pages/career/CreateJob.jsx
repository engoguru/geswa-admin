
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";
import { createJob } from "../../../redux/slice/careerslice";
import MainLayout from "../../layout/MainLayout";



const initialState = {
  title: "",
  description: "",
  responsibilities: "",
  requirements: "",
  benefits: "",
  location: "",
  salaryRange: "",
  employmentType: "",
  experience: "",
};

function CreateJob() {
  const dispatch = useDispatch();


  const [jobData, setJobData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const convertToArray = (value) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        title: jobData.title.trim(),
        description: jobData.description.trim(),

        responsibilities: convertToArray(jobData.responsibilities),

        requirements: convertToArray(jobData.requirements),

        benefits: convertToArray(jobData.benefits),

        location: jobData.location.trim(),
        salaryRange: jobData.salaryRange.trim(),
        employmentType: jobData.employmentType,
        experience: jobData.experience.trim(),
      };
      console.log(payload, "pp")
      await dispatch(createJob(payload)).unwrap();

      setJobData(initialState);
    } catch (error) {
      console.error("Create Job Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 1000,
            mx: "auto",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            textAlign="center"
            mb={4}
          >
            Create New Job
          </Typography>

          <form onSubmit={handleSubmit} >
            <Grid container spacing={3}>
              {/* Title */}
              <Grid item size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  label="Job Title"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                />
              </Grid>

              {/* Location */}
              <Grid item size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  label="Location"
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                />
              </Grid>

              {/* Salary */}
              <Grid item size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Salary Range"
                  name="salaryRange"
                  value={jobData.salaryRange}
                  onChange={handleChange}
                  placeholder="₹4 LPA - ₹8 LPA"
                />
              </Grid>

              {/* Employment Type */}
              <Grid item size={{ md: 6, xs: 12 }}>
                <TextField
                  select
                  fullWidth
                  required
                  label="Employment Type"
                  name="employmentType"
                  value={jobData.employmentType}
                  onChange={handleChange}
                >
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Part Time">Part Time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </TextField>
              </Grid>

              {/* Experience */}
              <Grid item size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  label="Experience Required"
                  name="experience"
                  value={jobData.experience}
                  onChange={handleChange}
                  placeholder="2-5 Years"
                />
              </Grid>

              {/* Description */}
              <Grid item size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={3}
                  label="Job Description"
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                />
              </Grid>

              {/* Responsibilities */}
              <Grid item size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Responsibilities (One per line)"
                  name="responsibilities"
                  value={jobData.responsibilities}
                  onChange={handleChange}
                  placeholder={`Develop web applications
Collaborate with team
Write clean code`}
                />
              </Grid>

              {/* Requirements */}
              <Grid item size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Requirements (One per line)"
                  name="requirements"
                  value={jobData.requirements}
                  onChange={handleChange}
                  placeholder={`React.js
Node.js
MongoDB`}
                />
              </Grid>

              {/* Benefits */}
              <Grid item size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Benefits (One per line)"
                  name="benefits"
                  value={jobData.benefits}
                  onChange={handleChange}
                  placeholder={`Health Insurance
Work From Home
Paid Leave`}
                />
              </Grid>

              {/* Submit */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={loading}
                  sx={{ py: 0.5 }}
                >
                  {loading ? "Creating Job..." : "Create Job"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default CreateJob;

