
import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  Paper,
  TextField,
  Box,
  Grid,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOneHospital,
  updateHospitals,
} from "../../../redux/slice/hospitalSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Update() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { hospitalOneData, loading } = useSelector(
    (state) => state.hospital
  );

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
  });
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev)=>({
        ...prev,
        hospitalImage: file
      }))
      setImage(URL.createObjectURL(file));
    }
  };
  // Fetch hospital details
  useEffect(() => {
    if (id) {
      dispatch(fetchOneHospital(id));
    }
  }, [dispatch, id]);

  // Populate form
  useEffect(() => {
    if (hospitalOneData) {
      setForm({
        name: hospitalOneData.name || "",
        tagline: hospitalOneData.tagline || "",
        rating: hospitalOneData.rating || "",
        reviews: hospitalOneData.reviews || "",
        address: hospitalOneData.address || "",
        city: hospitalOneData.city || "",
        state: hospitalOneData.state || "",
        zip: hospitalOneData.zip || "",
        about: hospitalOneData.about || "",
        services: hospitalOneData.services?.join(", ") || "",
        availability: hospitalOneData.availability || "",
        contact: hospitalOneData.contact || "",
        email: hospitalOneData.email || "",
      });
      setImage(hospitalOneData?.imageUrl)
    }
  }, [hospitalOneData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      services: form.services
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
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

      const response = await dispatch(
        updateHospitals({ id, data: formData })
      ).unwrap();

      if (response?.success) {
        toast.success(response.message || "Hospital updated successfully");
        navigate("/partner");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Failed to update hospital");
    }
  };
  console.log(hospitalOneData)
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
            sx={{ pb: 2 }}
          >
            Update Partner
          </Typography>

          <Divider
            sx={{
              mb: 4,
              borderColor: "rgba(0,0,0,0.37)",
              borderBottomWidth: 3,
            }}
          />

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
                <TextField
                  fullWidth
                  label="Partner Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6, md: 4 }} >

                {/* <img src={hospitalOneData?.imageUrl} alt="preview" width="120" /> */}
                <img src={image} alt="preview" width="120" />

                <input
                  type="file"
                  accept="image/*"
                  name="hospitalImage"
                  onChange={handleImageChange}
                  style={{ marginTop: 10 }}
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
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
                  type="number"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Reviews"
                  type="number"
                  name="reviews"
                  value={form.reviews}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
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

              <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
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

              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Services (comma separated)"
                  name="services"
                  value={form.services}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

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
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Partner"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default Update;

