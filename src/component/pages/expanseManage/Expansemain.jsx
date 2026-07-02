import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Box, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "expenseName", headerName: "Expense Name", width: 200 },
  { field: "amount", headerName: "Amount", width: 120, type: "number" },
  { field: "date", headerName: "Date", width: 150 },
];

const rows = [
  { id: 1, expenseName: "Electricity Bill", amount: 2500, date: "2025-06-01" },
  { id: 2, expenseName: "Internet", amount: 1200, date: "2025-06-03" },
  { id: 3, expenseName: "Office Rent", amount: 15000, date: "2025-06-05" },
];

function Expansemain() {
  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Expense Management
        </Typography>

        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: 5,
                },
              },
            }}
          />
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default Expansemain;