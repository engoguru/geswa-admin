import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  TextField,
  Divider,
  Stack,
} from "@mui/material";

import { viewOneJob} from "../../../redux/slice/careerslice";

function ViewJob() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { oneJobs } = useSelector((state) => state?.career);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    dispatch(viewOneJob(id));
  }, [id]);

  useEffect(() => {
    if (oneJobs) {
      setFormData(oneJobs);
    }
  }, [oneJobs]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    // await dispatch(updateJob({ id, data: formData })).unwrap();
    setEditMode(false);
  };

  if (!formData) return null;

  const renderChips = (items) => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {items?.map((item, i) => (
        <Chip key={i} label={item} sx={{ mb: 1 }} />
      ))}
    </Stack>
  );

  return (
    <MainLayout>
      <Box p={3}>
        {/* Header */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {editMode ? (
                <TextField
                  fullWidth
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  variant="outlined"
                />
              ) : (
                <Typography variant="h4" fontWeight={700} sx={{marginBottom:"10px"}}>
                  {formData.title}
                </Typography>
              )}

              <Typography color="text.secondary">
                {formData.location} • {formData.employmentType} •{" "}
                {formData.experience}
              </Typography>
            </Grid>

            <Grid item>
              {editMode ? (
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleUpdate}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              ) : (
                <></>
                // <Button
                //   variant="contained"
                  
                //   // onClick={() => setEditMode(true)}
                // >
                //   {/* Edit Job */}
                // </Button>
              )}
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3} mt={2}>
          {/* LEFT SIDE */}
          <Grid item xs={12} md={8} >
            {/* Description */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 2, mt:3 }}>
              <Typography variant="h6" fontWeight={600}>
                Description
              </Typography>
              <Divider sx={{ my: 1 }} />

              {editMode ? (
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    handleChange("description", e.target.value)
                  }
                />
              ) : (
                <Typography>{formData.description}</Typography>
              )}
            </Paper>

            {/* Responsibilities */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Responsibilities
              </Typography>
              <Divider sx={{ my: 1 }} />
              {renderChips(formData.responsibilities)}
            </Paper>

            {/* Requirements */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Requirements
              </Typography>
              <Divider sx={{ my: 1 }} />
              {renderChips(formData.requirements)}
            </Paper>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={4}>
            {/* Job Info */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Job Details
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Typography>
                <b>Salary:</b>{" "}
                {editMode ? (
                  <TextField
                    fullWidth
                    value={formData.salaryRange}
                    onChange={(e) =>
                      handleChange("salaryRange", e.target.value)
                    }
                  />
                ) : (
                  formData.salaryRange
                )}
              </Typography>

              <Typography mt={1}>
                <b>Employment:</b> {formData.employmentType}
              </Typography>

              <Typography mt={1}>
                <b>Experience:</b> {formData.experience}
              </Typography>

              <Typography mt={1}>
                <b>Status:</b>{" "}
                {formData.isActive ? "Active" : "Inactive"}
              </Typography>
            </Paper>

            {/* Benefits */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Benefits
              </Typography>
              <Divider sx={{ my: 1 }} />
              {renderChips(formData.benefits)}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}

export default ViewJob;