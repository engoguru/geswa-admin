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

function Taluka() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);

  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
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
      const res = await axios.get(`${baseUrl}state/viewAll`, {
        withCredentials: true
      });
      setStates(res.data.data);
    } catch {
      showMessage("error", "Unable to load states");
    }
  };

  const loadDistricts = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}district/viewAll/${id}`, {
        withCredentials: true
      });
      setDistricts(res.data.data);
    } catch {
      showMessage("error", "Unable to load districts");
    }
  };

  const loadTalukas = async (id) => {
    if (!id) {
      setTalukas([]);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(`${baseUrl}taluka/viewAll/${id}`,{
        withCredentials:true
      });

      setTalukas(res.data.data);
    } catch {
      showMessage("error", "Unable to load talukas");
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (e) => {
    const id = e.target.value;

    setStateId(id);
    setDistrictId("");

    setDistricts([]);
    setTalukas([]);

    loadDistricts(id);
  };

  const handleDistrictChange = (e) => {
    const id = e.target.value;

    setDistrictId(id);

    loadTalukas(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stateId)
      return showMessage("warning", "Select State");

    if (!districtId)
      return showMessage("warning", "Select District");

    if (!name.trim())
      return showMessage("warning", "Enter Taluka Name");

    try {
      await axios.post(`${baseUrl}taluka/create`, {
        name,
        districtId,
      },{
        withCredentials:true
      });

      showMessage("success", "Taluka created successfully");

      setName("");

      loadTalukas(districtId);
    } catch (error) {
      console.log(error)
      showMessage(
        "error",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mb: 3,
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Taluka Management
          </Typography>

          <Button
            variant="contained"
            component={Link}
            to="/village"
          >
            Add Village
          </Button>
        </Box>

        <Card>
          <CardContent>

            <Typography variant="h6" mb={2}>
              Create Taluka
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
                    {districts.map((district) => (
                      <MenuItem key={district.id} value={district.id}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Taluka Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Button
                  variant="contained"
                  type="submit"
                >
                  Create Taluka
                </Button>

              </Stack>
            </Box>

          </CardContent>
        </Card>

        <Card sx={{ mt: 4 }}>
          <CardContent>

            <Typography variant="h6" mb={2}>
              Taluka List
            </Typography>

            {!districtId ? (
              <Typography color="text.secondary">
                Select a district to view talukas.
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
                      <TableCell>Taluka Name</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>

                    {talukas.length > 0 ? (
                      talukas.map((taluka) => (
                        <TableRow key={taluka.id}>
                          <TableCell>{taluka.id}</TableCell>
                          <TableCell>{taluka.name}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={2}
                        >
                          No Talukas Found
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
          <Alert
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

      </Container>
    </MainLayout>
  );
}

export default Taluka;