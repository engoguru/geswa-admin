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
import { baseUrl } from "../../../utils/baseUrl";
import { Link } from "react-router-dom";

function District() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [stateId, setStateId] = useState("");
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

  const loadStates = async () => {
    try {
      // baseUrl
      const res = await axios.get(`${baseUrl}state/viewAll`,
        {
          withCredentials: true
        }
      );
      setStates(res.data.data);
    } catch (error) {
      showMessage("error", "Unable to load states");
    }
  };

  const loadDistricts = async (id) => {
    if (!id) {
      setDistricts([]);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(`${baseUrl}district/viewAll/${id}`, {
        withCredentials: true
      });

      setDistricts(res.data.data);
    } catch (error) {
      showMessage("error", "Unable to load districts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStates();
  }, []);

  const handleStateChange = (e) => {
    const id = e.target.value;
    setStateId(id);
    loadDistricts(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stateId)
      return showMessage("warning", "Please select a state");

    if (!name.trim())
      return showMessage("warning", "District name is required");

    try {
      await axios.post(`${baseUrl}district/create`, {
        name,
        stateId,
      }, {
        withCredentials: true
      });

      showMessage("success", "District created successfully");

      setName("");

      loadDistricts(stateId);
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
            District Management
          </Typography>

          <Button
            variant="contained"
            component={Link}
            to="/taluka"
          >
            Add Taluka
          </Button>
        </Box>
        <Card>
          <CardContent>

            <Typography variant="h6" mb={2}>
              Create District
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>

                <FormControl fullWidth>
                  <InputLabel>Select State</InputLabel>

                  <Select
                    value={stateId}
                    label="Select State"
                    onChange={handleStateChange}
                  >
                    {states?.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="District Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Button
                  variant="contained"
                  type="submit"
                >
                  Create District
                </Button>

              </Stack>
            </Box>

          </CardContent>
        </Card>

        <Card sx={{ mt: 4 }}>
          <CardContent>

            <Typography variant="h6" mb={2}>
              District List
            </Typography>

            {!stateId ? (
              <Typography color="text.secondary">
                Select a state to view districts.
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
                      <TableCell>District Name</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {districts?.length > 0 ? (
                      districts.map((district) => (
                        <TableRow key={district.id}>
                          <TableCell>{district.id}</TableCell>
                          <TableCell>{district.name}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          align="center"
                        >
                          No Districts Found
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

export default District;