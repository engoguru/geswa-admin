import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Box, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "employee", headerName: "Employee", width: 200 },
  { field: "department", headerName: "Department", width: 180 },
  { field: "salary", headerName: "Salary", width: 150 },
];

const rows = [
  {
    id: 1,
    employee: "John Doe",
    department: "IT",
    salary: 50000,
  },
  {
    id: 2,
    employee: "Jane Smith",
    department: "HR",
    salary: 45000,
  },
];

function SalaryMain() {
  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Salary Management
        </Typography>

        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
          />
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default SalaryMain;