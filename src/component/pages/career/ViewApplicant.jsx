import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import { updateApplicant, viewAOneApplicant } from "../../../redux/slice/careerslice";

function ViewApplicant() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { oneApplicant, loading } = useSelector((state) => state.career);

  const applicant = Array.isArray(oneApplicant)
    ? oneApplicant[0]
    : oneApplicant;

  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(viewAOneApplicant(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (applicant?.status) setStatus(applicant.status);
  }, [applicant]);

  const getChipColor = (status) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "INTERVIEWED":
        return "info";
      case "OFFERED":
        return "secondary";
      case "HIRED":
        return "success";
      case "REJECTED":
        return "error";
      default:
        return "default";
    }
  };
  const handleSubmit=async()=>{
     console.log(status)
    const response=await dispatch(updateApplicant({id,status})).unwrap()
    console.log(response)
  }

  const Field = ({ label, value }) => (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || "-"}</Typography>
    </Box>
  );

  if (loading) {
    return (
      <MainLayout>
        <Box sx={{ p: 4 }}>
          <Typography>Loading...</Typography>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box sx={{ p: 3, maxWidth: 1100, mx: "auto" }}>
        <Card elevation={6} sx={{ borderRadius: 3 }}>

          <Box
            sx={{
              p: 2,
              background: "linear-gradient(90deg,#1e88e5,#42a5f5)",
              color: "#fff",
            }}
          >
            <Typography variant="h5">Applicant Details</Typography>
            <Typography variant="body2">
              Complete application record
            </Typography>
          </Box>

          <CardContent>
            <Grid container spacing={3}>

              {/* LEFT SIDE DETAILS */}
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2, border: "1px solid #eee" }}>
                  <Typography fontWeight={600} mb={2}>
                    Personal Information
                  </Typography>

                  <Grid container spacing={4}>
                    <Grid item size={{ md: 4 }}>
                      <Field label="Full Name" value={applicant?.fullName} />
                    </Grid>
                    <Grid item size={{ md: 4 }}>
                      <Field label="Email" value={applicant?.email} />
                    </Grid>
                    <Grid item size={{ md: 4 }}>
                      <Field label="Phone" value={applicant?.phone} />
                    </Grid>
                    <Grid item size={{ md: 4 }}>
                      <Field label="Experience" value={`${applicant?.experience} Years`} />
                    </Grid>
                    <Grid item size={{ md: 4 }}>
                      <Field label="Job Title" value={applicant?.job?.title} />
                    </Grid>
                    <Grid item size={{ md: 4 }}>
                      <Field
                        label="Applied Date"
                        value={new Date(applicant?.createdAt).toLocaleString()}
                      />
                    </Grid>


                  </Grid>
                </Paper>

                <Paper sx={{ p: 2, mt: 2, border: "1px solid #eee" }}>
                  <Typography fontWeight={600} mb={1}>
                    Cover Letter
                  </Typography>
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {applicant?.coverLetter}
                  </Typography>
                </Paper>
              </Grid>

              {/* RIGHT SIDE */}
              <Grid item xs={12} md={4}>
                <Stack spacing={2}>

                  <Paper sx={{ p: 2, border: "1px solid #eee" }}>
                    <Typography fontWeight={600}>
                      Application Status
                    </Typography>

                    <Chip
                      label={status}
                      color={getChipColor(status)}
                      sx={{ mt: 1 }}
                    />

                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                      >

                        <MenuItem value="PENDING">PENDING</MenuItem>
                        <MenuItem value="REVIEWING">REVIEWING</MenuItem>
                        <MenuItem value="SHORTLISTED">SHORTLISTED</MenuItem>
                        <MenuItem value="HIRED">HIRED</MenuItem>
                        <MenuItem value="REJECTED">REJECTED</MenuItem>
                      </Select>
                    </FormControl>
                  </Paper>

                  <Paper sx={{ p: 2, border: "1px solid #eee" }}>
                    <Typography fontWeight={600}>
                      Resume
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2 }}
                      href={applicant?.resume_Url}
                      target="_blank"
                    >
                      Open Resume
                    </Button>

                    <Field
                      label="Resume File"
                      value={applicant?.resume_publicId}
                    />
                  </Paper>

                  <Paper sx={{ p: 2, border: "1px solid #eee",  }}>
                    <Typography fontWeight={600}>
                      System Info
                    </Typography>
                    <Field
                      label="Created At"
                      value={
                        applicant?.createdAt
                          ? new Date(applicant.createdAt).toLocaleDateString("en-IN")
                          : "-"
                      }
                    />

                    <Field
                      label="Updated At"
                      value={
                        applicant?.updatedAt
                          ? new Date(applicant.updatedAt).toLocaleDateString("en-IN")
                          : "-"
                      }
                    />
                  </Paper>




<Button onClick={handleSubmit}>Update</Button>
                </Stack>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
}

export default ViewApplicant;