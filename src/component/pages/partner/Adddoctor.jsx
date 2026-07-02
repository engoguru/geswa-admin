import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Input
} from "@mui/material";
import { createDoctors } from "../../../redux/slice/hospitalSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function AddDoctor() {
  const { id } = useParams()
  const dispatch = useDispatch()
  // useDispatch
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    experience: "",
    hospitalId: id || "",
    doctorImage: null
  });
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFile = (e) => {
    setForm((prev) => ({
      ...prev, doctorImage: e.target.files[0]
    }))
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.specialty || !form.hospitalId) {
      alert("Please fill all required fields");
      return;
    }

    // const payload = {
    //   ...form,
    //   experience: form.experience
    //     ? parseInt(form.experience)
    //     : null,
    //   hospitalId: parseInt(form.hospitalId),
    // };
    const formdata = new FormData()
    // console.log(payload);
    formdata.append("name", form.name)
    formdata.append("specialty", form.specialty)
    formdata.append("experience", form.experience)
    formdata.append("hospitalId", form.hospitalId)
    formdata.append("file", form.doctorImage)

    try {
      const response = await dispatch(createDoctors(formdata)).unwrap();
      if (response?.success) {
        setForm()
        setPreview()
        toast.success("Created !")

      }
      alert("Doctor added successfully");
      setForm({
        name: "",
        specialty: "",
        experience: "",
        hospitalId: id || "",
        doctorImage: null
      })
    } catch (error) {
      console.error(error);
      alert("Failed to add doctor");
    }
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Paper
          elevation={5}
          sx={{
            p: 4,
            maxWidth: 800,
            mx: "auto",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight={600}
            sx={{
              pb: 2
            }}
          >
            Add Doctor
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Doctor Name"
                  name="name"
                  size="small"
                  value={form?.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", marginBottom: "60px" }} >
                <Input
                  fullWidth
                  type="file"
                  name="doctorImage"
                  inputProps={{ accept: "image/*" }}
                  onChange={handleFile}
                  required
                />

                {preview && (
                  <Box sx={{ mt: 0, textAlign: "center" }} spacing={5}>


                    <img
                      src={preview}
                      alt="Doctor Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: 80,
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                )}

              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Specialty"
                  name="specialty"
                  size="small"
                  value={form?.specialty}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Experience (Years)"
                  name="experience"
                  type="number"
                  size="small"
                  value={form?.experience}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hospital ID"
                  name="hospitalId"
                  type="number"
                  size="small"
                  value={form?.hospitalId}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  fullWidth
                >
                  Add Doctor
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default AddDoctor; 