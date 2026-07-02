import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Box, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "productName", headerName: "Product Name", width: 200 },
  { field: "category", headerName: "Category", width: 180 },
  { field: "price", headerName: "Price", width: 120, type: "number" },
  { field: "stock", headerName: "Stock", width: 120, type: "number" },
];

const rows = [
  {
    id: 1,
    productName: "Laptop",
    category: "Electronics",
    price: 50000,
    stock: 10,
  },
  {
    id: 2,
    productName: "Mouse",
    category: "Accessories",
    price: 500,
    stock: 50,
  },
];

function ProductMain() {
  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Product Management
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

export default ProductMain;