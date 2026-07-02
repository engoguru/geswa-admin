import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

function UserData() {
  const data = [
    { id: 0, value: 45, label: "Software Development" },
    { id: 1, value: 25, label: "Physical Gates & Motors" },
    { id: 2, value: 10, label: "Raspberry Pi & Controllers" },
    { id: 3, value: 8, label: "QR Scanners" },
    { id: 4, value: 7, label: "Installation & Wiring" },
    { id: 5, value: 5, label: "Maintenance & Support" },
     { id: 6, value: 5, label: "Maintenance & Support" },
  ];

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
      <Typography variant="h6" gutterBottom sx={{px:2,py:2,fontWeight:600}}>
        User Distribution
      </Typography>

      <PieChart
   
        series={[
          {
            data,
            innerRadius: 50,
            outerRadius: 120,
            paddingAngle: 2,
            cornerRadius: 5,
          },
        ]}
        width={500}
        height={400}
      />
    </Box>
  );
}

export default UserData;