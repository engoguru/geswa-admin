import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Box, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "customer", headerName: "Customer", width: 200 },
  { field: "product", headerName: "Product", width: 200 },
  { field: "amount", headerName: "Amount", width: 120 },
];

const rows = [
  { id: 1, customer: "John", product: "Laptop", amount: 50000 },
  { id: 2, customer: "Sam", product: "Phone", amount: 25000 },
];

function SaleMain() {
  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Sales Management
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

export default SaleMain;