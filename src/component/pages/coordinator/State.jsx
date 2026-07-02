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
  Paper,
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

function State() {
  const [name, setName] = useState("");
  const [states, setStates] = useState([]);
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
      setLoading(true);

      const res = await axios.get(`${baseUrl}state/viewAll`,
        {
          withCredentials: true
        }
      );

      setStates(res?.data.data);
    } catch (error) {
      showMessage("error", "Unable to load states");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return showMessage("warning", "State name is required");
    }

    try {
      await axios.post(`${baseUrl}state/create`, {
        name,
      },
      {withCredentials:true}
    );

      showMessage("success", "State created successfully");

      setName("");

      loadStates();
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
          State Management
        </Typography>

        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Create State
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="State Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Button
                  variant="contained"
                  type="submit"
                  sx={{ minWidth: 180 }}
                >
                  Create State
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        <Card elevation={3} sx={{ mt: 4 }}>
          <CardContent>
                <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    mb: 3,
  }}
>
  <Typography variant="h6" fontWeight={700}>
   State List
  </Typography>

  <Button
    variant="contained"
    component={Link}
    to="/district"
  >
    Add District
  </Button>
</Box>

            {loading ? (
              <Box textAlign="center" py={4}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell width={100}>ID</TableCell>
                      <TableCell>State Name</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {states?.length > 0 ? (
                      states.map((state) => (
                        <TableRow key={state.id}>
                          <TableCell>{state.id}</TableCell>
                          <TableCell>{state.name}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          No States Found
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

export default State;