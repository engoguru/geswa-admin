import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  Paper,
  TextField,
  Box,
  Grid,
  Button,
  Typography,
  Divider,
  Input,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createHospitals } from "../../../redux/slice/hospitalSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddPartner() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    rating: "",
    reviews: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    about: "",
    services: "",
    availability: "",
    contact: "",
    email: "",
    hospitalImage: null,
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFile = (e) => {
    setForm((prev) => ({
      ...prev,
      hospitalImage: e.target.files[0],
    }));
    setPreview(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.tagline ||
      !form.rating ||
      !form.reviews ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.zip ||
      !form.about ||
      !form.services ||
      !form.availability ||
      !form.contact ||
      !form.email
    ) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      ...form,
      rating: parseFloat(form.rating),
      reviews: parseInt(form.reviews),
      services: form.services.split(",").map((item) => item.trim()),
    };

    try {
      const formData = new FormData();
      // console.log(payload);
      formData.append("name", payload.name);
      formData.append("tagline", payload.tagline);
      formData.append("rating", payload.rating);
      formData.append("reviews", payload.reviews);
      formData.append("address", payload.address);
      formData.append("city", payload.city);
      formData.append("state", payload.state);
      formData.append("zip", payload.zip);
      formData.append("about", payload.about);
      formData.append("contact", payload.contact);
      formData.append(
        "services",
        JSON.stringify(payload.services)
      );
      formData.append("availability", payload.availability);
      formData.append("email", payload.email);
      formData.append("file", form.hospitalImage);
      // Example:

      const response = await dispatch(createHospitals(formData)).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        navigate("/partner");
      }
    } catch (error) {
      console.error(error);
      // toast
      alert("Failed to add partner");
    }
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Paper
          elevation={5}
          sx={{
            p: 4,
            maxWidth: 1000,
            mx: "auto",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            textAlign="center"
            sx={{
              pb: 2
            }}
          >
            Add Partner +
          </Typography>
          <Divider
            sx={{
              mb: 4,
              borderColor: "rgba(0, 0, 0, 0.37)",
              borderBottomWidth: 3, // thickness in px
            }}
          />

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}  >
              {/* Basic Information */}
              <Grid container item size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex", padding: "5px" }}>
                <TextField
                  fullWidth
                  label="Partner Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  size="small"
                />
                <Input
                  type="file"
                  accept="image/*"
                  name="hospitalImage"
                  onChange={handleFile}
                />
                {preview && (
                  <img src={preview} alt="preview" width="120" />
                )}
              </Grid>

              <Grid item size={{ xs: 12, sm: 12, md: 12 }}>
                <TextField
                  fullWidth
                  label="Tagline"
                  name="tagline"
                  value={form.tagline}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Rating"
                  name="rating"
                  type="number"
                  inputProps={{ step: "0.1" }}
                  value={form.rating}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Reviews"
                  name="reviews"
                  type="number"
                  value={form.reviews}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              {/* Address */}
              <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              {/* About */}
              <Grid item size={{ xs: 12, sm: 12, md: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="About"
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              {/* Services */}
              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Services (comma separated)"
                  name="services"
                  value={form.services}
                  onChange={handleChange}
                  placeholder="Plumbing, Electrical, Cleaning"
                  size="small"
                />
              </Grid>

              {/* Availability */}
              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Availability"
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              {/* Contact */}
              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              {/* Submit */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  fullWidth
                  sx={{
                    py: 1,
                    fontSize: "12px",
                    fontWeight: 600,
                  }}

                >
                  Add Partner
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default AddPartner;