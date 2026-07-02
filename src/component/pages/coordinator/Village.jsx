import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";

function Village() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [villages, setVillages] = useState([]);

  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [talukaId, setTalukaId] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const showMessage = (severity, message) => {
    setSnackbar({
      open: true,
      severity,
      message,
    });
  };

  useEffect(() => {
    loadStates();
  }, []);

  const loadStates = async () => {
    try {
      const res = await axios.get(`${baseUrl}state/viewAll`,{
        withCredentials:true
      });
      setStates(res.data.data);
    } catch {
      showMessage("error", "Unable to load states");
    }
  };

  const loadDistricts = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}district/viewAll/${id}`,{
        withCredentials:true
      });
      setDistricts(res.data.data);
    } catch {
      showMessage("error", "Unable to load districts");
    }
  };

  const loadTalukas = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}taluka/viewAll/${id}`,{
        withCredentials:true
      });
      setTalukas(res.data.data);
    } catch {
      showMessage("error", "Unable to load talukas");
    }
  };

  const loadVillages = async (id) => {
    if (!id) {
      setVillages([]);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(`${baseUrl}village/viewAll/${id}`,{
        withCredentials:true
      });

      setVillages(res.data.data);
    } catch {
      showMessage("error", "Unable to load villages");
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (e) => {
    const id = e.target.value;

    setStateId(id);
    setDistrictId("");
    setTalukaId("");

    setDistricts([]);
    setTalukas([]);
    setVillages([]);

    loadDistricts(id);
  };

  const handleDistrictChange = (e) => {
    const id = e.target.value;

    setDistrictId(id);
    setTalukaId("");

    setTalukas([]);
    setVillages([]);

    loadTalukas(id);
  };

  const handleTalukaChange = (e) => {
    const id = e.target.value;

    setTalukaId(id);

    loadVillages(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stateId)
      return showMessage("warning", "Select State");

    if (!districtId)
      return showMessage("warning", "Select District");

    if (!talukaId)
      return showMessage("warning", "Select Taluka");

    if (!name.trim())
      return showMessage("warning", "Enter Village Name");

    try {
      await axios.post(`${baseUrl}village/create`, {
        name,
        talukaId,
      },{
        withCredentials:true
      });

      showMessage("success", "Village created successfully");

      setName("");

      loadVillages(talukaId);
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>

        <Typography variant="h4" fontWeight={700} mb={3}>
          Village Management
        </Typography>

        <Card>
          <CardContent>

            <Typography variant="h6" mb={2}>
              Create Village
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>

                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={stateId}
                    label="State"
                    onChange={handleStateChange}
                  >
                    {states?.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth disabled={!stateId}>
                  <InputLabel>District</InputLabel>
                  <Select
                    value={districtId}
                    label="District"
                    onChange={handleDistrictChange}
                  >
                    {districts?.map((district) => (
                      <MenuItem key={district.id} value={district.id}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth disabled={!districtId}>
                  <InputLabel>Taluka</InputLabel>
                  <Select
                    value={talukaId}
                    label="Taluka"
                    onChange={handleTalukaChange}
                  >
                    {talukas.map((taluka) => (
                      <MenuItem key={taluka.id} value={taluka.id}>
                        {taluka.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Village Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Button
                  variant="contained"
                  type="submit"
                >
                  Create Village
                </Button>

              </Stack>
            </Box>

          </CardContent>
        </Card>

        <Card sx={{ mt: 4 }}>
          <CardContent>

            <Typography variant="h6" mb={2}>
              Village List
            </Typography>

            {!talukaId ? (
              <Typography color="text.secondary">
                Select a taluka to view villages.
              </Typography>
            ) : loading ? (
              <Box textAlign="center" py={4}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>

                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Village Name</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>

                    {villages?.length > 0 ? (
                      villages.map((village) => (
                        <TableRow key={village.id}>
                          <TableCell>{village.id}</TableCell>
                          <TableCell>{village.name}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          align="center"
                        >
                          No Villages Found
                        </TableCell>
                      </TableRow>
                    )}

                  </TableBody>

                </Table>
              </TableContainer>
            )}

          </CardContent>
        </Card>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
        >
          <Alert severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>

      </Container>
    </MainLayout>
  );
}

export default Village;