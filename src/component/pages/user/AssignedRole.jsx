import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

function AssignedRole({ userId }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    employeeId: "",
    departmentId: "",
    roleId: "",
    stateId: "",
    districtId: "",
    talukaId: "",
    villageId: "",
    isActive: true,
  });

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [villages, setVillages] = useState([]);

  // ================== Load pree-assined role==========
  const [preAssigned, SetpreAssigned] = useState()
  // ================= Employee =================

  const loadEmployee = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}employee/view/${userId}`,
        {
          withCredentials: true,
        }
      );

      setForm((prev) => ({
        ...prev,
        employeeId: res.data.data.id,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Department =================

  const loadDepartments = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}department/viewAll`,
        {
          withCredentials: true,
        }
      );

      setDepartments(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Role =================

  const loadRoles = async (departmentId) => {
    try {
      if (!departmentId) {
        setRoles([]);
        return;
      }

      const res = await axios.get(
        `${baseUrl}role/viewAll/${departmentId}`,
        {
          withCredentials: true,
        }
      );

      setRoles(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= State =================

  const loadStates = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}state/viewAll`,
        {
          withCredentials: true,
        }
      );

      setStates(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= District =================

  const loadDistricts = async (stateId) => {
    try {
      if (!stateId) {
        setDistricts([]);
        return;
      }

      const res = await axios.get(
        `${baseUrl}district/viewAll/${stateId}`,
        {
          withCredentials: true,
        }
      );

      setDistricts(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Taluka =================

  const loadTalukas = async (districtId) => {
    try {
      if (!districtId) {
        setTalukas([]);
        return;
      }

      const res = await axios.get(
        `${baseUrl}taluka/viewAll/${districtId}`,
        {
          withCredentials: true,
        }
      );

      setTalukas(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Village =================

  const loadVillages = async (talukaId) => {
    try {
      if (!talukaId) {
        setVillages([]);
        return;
      }

      const res = await axios.get(
        `${baseUrl}village/viewAll/${talukaId}`,
        {
          withCredentials: true,
        }
      );

      setVillages(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Initial Load =================

  useEffect(() => {
    loadEmployee();
    loadDepartments();
    loadStates();
  }, []);

  // ================= Change =================

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "departmentId") {
      setForm((prev) => ({
        ...prev,
        departmentId: value,
        roleId: "",
      }));

      setRoles([]);

      await loadRoles(value);

      return;
    }

    if (name === "stateId") {
      setForm((prev) => ({
        ...prev,
        stateId: value,
        districtId: "",
        talukaId: "",
        villageId: "",
      }));

      setDistricts([]);
      setTalukas([]);
      setVillages([]);

      await loadDistricts(value);

      return;
    }

    if (name === "districtId") {
      setForm((prev) => ({
        ...prev,
        districtId: value,
        talukaId: "",
        villageId: "",
      }));

      setTalukas([]);
      setVillages([]);

      await loadTalukas(value);

      return;
    }

    if (name === "talukaId") {
      setForm((prev) => ({
        ...prev,
        talukaId: value,
        villageId: "",
      }));

      setVillages([]);

      await loadVillages(value);

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitch = (e) => {
    setForm((prev) => ({
      ...prev,
      isActive: e.target.checked,
    }));
  };

  const viewAssignedRole = async () => {
    try {

      const res = await axios.get(
        `${baseUrl}assigned/view/${form.employeeId}`,
        {
          withCredentials: true,
        }
      );
      SetpreAssigned(res?.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (form.employeeId) {
      viewAssignedRole();
    }
  }, [form.employeeId]);

  console.log(preAssigned)
  // ================= Submit =================

  const handleSubmit = async () => {
    try {
      setLoading(true);

      console.log(form);

      // await axios.post(...)
      const response = await axios.post(`${baseUrl}assigned/create`, form, {
        withCredentials: true
      })
      alert("Assigned Role !")
      console.log(response)
    } catch (error) {
      console.log(error);
      alert(error)
    } finally {
      setLoading(false);
    }
  };



  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Assign Employee Role
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Assign department, role and working location to the employee.
      </Typography>
      {preAssigned ?
        <>

          <div className="border rounded p-3 mb-3 bg-light">
            <h5>Previous Assignment</h5>

            <p>
              <strong>Department:</strong>{" "}
              {preAssigned.data.department?.name}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {preAssigned.data.role?.name}
            </p>

            <p>
              <strong>Work Location:</strong>{" "}
              {[
                preAssigned.data.village?.name,
                preAssigned.data.taluka?.name,
                preAssigned.data.district?.name,
                preAssigned.data.state?.name,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>

        </> : <>
          {/* ================= Assignment ================= */}

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              color="primary"
              gutterBottom
            >
              Assignment Details
            </Typography>

            <Divider sx={{ mb: 3 }} />


            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Employee ID"
                  value={form.employeeId}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Department"
                  name="departmentId"
                  value={form.departmentId}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Select Department</em>
                  </MenuItem>

                  {departments.map((department) => (
                    <MenuItem
                      key={department.id}
                      value={department.id}
                    >
                      {department.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Role"
                  name="roleId"
                  value={form.roleId}
                  onChange={handleChange}
                  disabled={!form.departmentId}
                >
                  <MenuItem value="">
                    <em>Select Role</em>
                  </MenuItem>

                  {roles.map((role) => (
                    <MenuItem
                      key={role.id}
                      value={role.id}
                    >
                      {role.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.isActive}
                      onChange={handleSwitch}
                    />
                  }
                  label={form.isActive ? "Active" : "Inactive"}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* ================= Location ================= */}

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              color="primary"
              gutterBottom
            >
              Working Location
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="State"
                  name="stateId"
                  value={form.stateId}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Select State</em>
                  </MenuItem>

                  {states.map((state) => (
                    <MenuItem
                      key={state.id}
                      value={state.id}
                    >
                      {state.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="District"
                  name="districtId"
                  value={form.districtId}
                  onChange={handleChange}
                  disabled={!form.stateId}
                >
                  <MenuItem value="">
                    <em>Select District</em>
                  </MenuItem>

                  {districts.map((district) => (
                    <MenuItem
                      key={district.id}
                      value={district.id}
                    >
                      {district.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Taluka"
                  name="talukaId"
                  value={form.talukaId}
                  onChange={handleChange}
                  disabled={!form.districtId}
                >
                  <MenuItem value="">
                    <em>Select Taluka</em>
                  </MenuItem>

                  {talukas.map((taluka) => (
                    <MenuItem
                      key={taluka.id}
                      value={taluka.id}
                    >
                      {taluka.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Village"
                  name="villageId"
                  value={form.villageId}
                  onChange={handleChange}
                  disabled={!form.talukaId}
                >
                  <MenuItem value="">
                    <em>Select Village</em>
                  </MenuItem>

                  {villages.map((village) => (
                    <MenuItem
                      key={village.id}
                      value={village.id}
                    >
                      {village.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          {/* ================= Submit ================= */}

          <Box
            mt={4}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                minWidth: 220,
                height: 50,
                borderRadius: 2,
              }}
            >
              {loading ? (
                <>
                  <CircularProgress
                    size={22}
                    sx={{ mr: 1, color: "#fff" }}
                  />
                  Saving...
                </>
              ) : (
                "Assign Role"
              )}
            </Button>
          </Box>

        </>}
    </Paper>
  );
}

export default AssignedRole;