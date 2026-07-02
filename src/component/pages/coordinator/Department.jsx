import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Snackbar,
  Alert,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import { Link } from "react-router-dom";

function Department() {
  const [name, setName] = useState("");
  const [departments, setDepartments] = useState([]);
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

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${baseUrl}department/viewAll`, {
        withCredentials: true
      });

      setDepartments(res?.data.data);
    } catch (error) {
      showMessage("error", "Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return showMessage("warning", "Department name is required");
    }

    try {
      await axios.post(
        `${baseUrl}department/create`,
        {
          name,
        },
        {
          withCredentials: true,
        }
      );

      showMessage("success", "Department created successfully");

      setName("");

      fetchDepartments();
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
        <Typography variant="h4" fontWeight={600} mb={3}>
          Department Management
        </Typography>

        <Card elevation={3}>
          <CardContent>

            <Typography variant="h6" mb={2}>
              Create Department
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="Department Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Button
                  variant="contained"
                  type="submit"
                  sx={{ minWidth: 170 }}
                >
                  Create
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        <Card elevation={3} sx={{ mt: 4 }}>
          <CardContent>

            <Typography variant="h6" mb={2}>
              Department List
            </Typography>

            {loading ? (
              <Box textAlign="center" py={4}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>

                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                       <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {departments?.length > 0 ? (
                      departments.map((dept) => (
                        <TableRow key={dept.id}>
                          <TableCell>{dept.id}</TableCell>
                          <TableCell>{dept.name}</TableCell>
                           <TableCell>
                            <Link to={`/role/${dept.id}`}>View Role</Link>
                           </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          No Departments Found
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

export default Department;