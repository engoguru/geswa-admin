import React from "react";
import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

function RevenueLineChart() {
  // Example months
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
  ];

  // Current month revenue data
  const currentMonthRevenue = [12000, 18000, 15000, 22000, 27000, 32000];

  // Total revenue data
  const totalRevenue = [50000, 70000, 85000, 120000, 150000, 190000];

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0px auto",
        padding: 0,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 0,
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        Revenue Analytics
      </Typography>

      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: months,
          },
        ]}
        series={[
          {
            data: currentMonthRevenue,
            label: "Current Month Revenue",
            color: "#1976d2",
          },
          {
            data: totalRevenue,
            label: "Total Revenue",
            color: "#2e7d32",
          },
        ]}
        // width={750}
        height={400}
        // margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
      />
    </Box>
  );
}

export default RevenueLineChart;