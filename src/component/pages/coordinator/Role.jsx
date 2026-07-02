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

function Role() {
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);

  const [departmentId, setDepartmentId] = useState("");
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

  // Load Departments
  const loadDepartments = async () => {

    try {

      const res = await axios.get(`${baseUrl}department/viewAll`, {
        withCredentials: true
      });

      setDepartments(res?.data.data);
    } catch (error) {
      showMessage("error", "Unable to load departments");
    }
  };

  // Load Roles By Department
  const loadRoles = async (id) => {
    if (!id) {
      setRoles([]);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(`${baseUrl}role/viewAll/${id}`, {
        withCredentials: true
      });

      setRoles(res?.data.data);
    } catch (error) {
      showMessage("error", "Unable to load roles");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {

    loadDepartments();
  }, []);

  // Department Change
  const handleDepartmentChange = (e) => {
    const id = e.target.value;

    setDepartmentId(id);

    loadRoles(id);
  };

  // Create Role
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!departmentId) {
      return showMessage("warning", "Please select a department");
    }

    if (!name.trim()) {
      return showMessage("warning", "Enter role name");
    }

    try {
      await axios.post(`${baseUrl}role/create`, {
        name,
        departmentId,
      }, { withCredentials: true });

      showMessage("success", "Role created successfully");

      setName("");

      loadRoles(departmentId);
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };
  // console.log(roles, "l")
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
    Role Management
  </Typography>

  <Button
    variant="contained"
    component={Link}
    to="/state"
  >
    Add State
  </Button>
</Box>

        <Card elevation={3}>
          <CardContent>

            <Typography variant="h6" mb={4}>
              Create Role
            </Typography>


            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>

                <FormControl fullWidth>
                  <InputLabel>Select Department</InputLabel>

                  <Select
                    value={departmentId}
                    label="Select Department"
                    onChange={handleDepartmentChange}
                  >
                    {departments?.map((department) => (
                      <MenuItem
                        key={department.id}
                        value={department.id}
                      >
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Role Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Button
                  variant="contained"
                  type="submit"
                >
                  Create Role
                </Button>

              </Stack>
            </Box>

          </CardContent>
        </Card>

        <Card elevation={3} sx={{ mt: 4 }}>
          <CardContent>

            <Typography variant="h6" mb={2}>
              Roles
            </Typography>

            {!departmentId ? (
              <Typography color="text.secondary">
                Please select a department.
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
                      <TableCell>Role Name</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>

                    {roles?.length > 0 ? (
                      roles?.map((role) => (
                        <TableRow key={role.id}>
                          <TableCell>{role.id}</TableCell>
                          <TableCell>{role.name}</TableCell>
                          <TableCell>
                            {new Date(role.createdAt).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          align="center"
                        >
                          No Roles Found
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

export default Role;