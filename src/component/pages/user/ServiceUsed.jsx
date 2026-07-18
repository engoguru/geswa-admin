import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMembershipServiceUser } from "../../../redux/slice/memberServiceSlice";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

/* ------------------------------------------------------------------ */
/*  Design tokens — shared with PremiumDetail for a consistent system  */
/* ------------------------------------------------------------------ */
const token = {
  ink: "#1B1F2A",
  inkSoft: "#636B79",
  inkFaint: "#9AA0AC",
  paper: "#F5F4EF",
  surface: "#FFFFFF",
  line: "#E6E4DC",
  gold: "#A9782F",
  goldDeep: "#7C5A22",
  goldSoft: "#F1E6CC",
  emerald: "#2F6B4F",
  emeraldSoft: "#E3EEE8",
  rose: "#9C4A44",
  roseSoft: "#F3E3E1",
  navyDeep: "#151A24",
  navyMid: "#232B3B",
};

const fontDisplay = "'Fraunces', 'Georgia', serif";
const fontBody = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const fontMono = "'IBM Plex Mono', 'Roboto Mono', monospace";

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function AmountPill({ value, tone = "ink" }) {
  const palette = {
    ink: { bg: "rgba(27,31,42,0.06)", fg: token.ink },
    gold: { bg: token.goldSoft, fg: token.goldDeep },
    emerald: { bg: token.emeraldSoft, fg: token.emerald },
    rose: { bg: token.roseSoft, fg: token.rose },
  }[tone];

  return (
    <Box
      sx={{
        display: "inline-flex",
        px: 1.3,
        py: 0.5,
        borderRadius: "8px",
        bgcolor: palette.bg,
        color: palette.fg,
        fontFamily: fontMono,
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.01em",
      }}
    >
      ₹{Number(value || 0).toLocaleString("en-IN")}
    </Box>
  );
}

function StatCard({ icon, label, value, accent }) {
  return (
    <Box
      sx={{
        position: "relative",
        p: 3,
        borderRadius: "16px",
        bgcolor: token.surface,
        border: `1px solid ${token.line}`,
        overflow: "hidden",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 3,
          height: "100%",
          bgcolor: accent,
        }}
      />
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography
            sx={{
              fontFamily: fontBody,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: token.inkFaint,
              mb: 0.75,
            }}
          >
            {label}
          </Typography>
          <Typography
            sx={{
              fontFamily: fontDisplay,
              fontSize: 26,
              fontWeight: 600,
              color: token.ink,
              lineHeight: 1.1,
            }}
          >
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            display: "grid",
            placeItems: "center",
            bgcolor: `${accent}14`,
            color: accent,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
      </Stack>
    </Box>
  );
}

const headCellSx = {
  fontFamily: fontBody,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.6)",
  borderBottom: "none",
  py: 1.75,
};

const bodyCellSx = {
  fontFamily: fontBody,
  borderBottom: `1px solid ${token.line}`,
  py: 2,
};

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

function ServiceUsed({ userId }) {
  const dispatch = useDispatch();

  const { userServices = [] } = useSelector((state) => state.memberService);

  useEffect(() => {
    if (userId) {
      dispatch(getAllMembershipServiceUser(userId));
    }
  }, [dispatch, userId]);

  const totalServices = userServices.length;

  const totalBill = userServices.reduce(
    (sum, item) => sum + Number(item.actualBillAmount || 0),
    0
  );

  const totalDiscount = userServices.reduce(
    (sum, item) => sum + Number(item.offerAmount || 0),
    0
  );

  const totalPaid = userServices.reduce(
    (sum, item) => sum + Number(item.finalAmount || 0),
    0
  );

  return (
    <Box sx={{ bgcolor: token.paper, minHeight: "100%", p: { xs: 2, md: 4 } }}>
      {/* ---------------- Stats ---------------- */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<ReceiptLongRoundedIcon />}
            label="Services Used"
            value={totalServices}
            accent={token.gold}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PaidRoundedIcon />}
            label="Actual Bill"
            value={`₹${totalBill.toLocaleString("en-IN")}`}
            accent={token.inkSoft}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<SavingsRoundedIcon />}
            label="Total Savings"
            value={`₹${totalDiscount.toLocaleString("en-IN")}`}
            accent={token.emerald}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<LocalHospitalRoundedIcon />}
            label="Amount Paid"
            value={`₹${totalPaid.toLocaleString("en-IN")}`}
            accent={token.rose}
          />
        </Grid>
      </Grid>

      {/* ---------------- Service history ---------------- */}
      <TableContainer
        sx={{
          borderRadius: "16px",
          border: `1px solid ${token.line}`,
          bgcolor: token.surface,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: token.navyDeep }}>
              <TableCell sx={headCellSx}>Hospital</TableCell>
              <TableCell sx={headCellSx}>Service</TableCell>
              <TableCell sx={headCellSx}>Bill</TableCell>
              <TableCell sx={headCellSx}>Discount</TableCell>
              <TableCell sx={headCellSx}>Paid</TableCell>
              <TableCell sx={headCellSx}>Date</TableCell>
              <TableCell sx={headCellSx}>Bill Copy</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userServices.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  sx={{
                    ...bodyCellSx,
                    textAlign: "center",
                    color: token.inkFaint,
                    py: 6,
                    borderBottom: "none",
                  }}
                >
                  No services used yet.
                </TableCell>
              </TableRow>
            )}

            {userServices.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  transition: "background-color 0.15s ease",
                  "&:hover": { bgcolor: token.paper },
                  "&:last-of-type td": { borderBottom: "none" },
                }}
              >
                <TableCell sx={bodyCellSx}>
                  <Stack direction="row" spacing={1.75} alignItems="center">
                    <Avatar
                      src={item.hospital.imageUrl}
                      sx={{ width: 48, height: 48, border: `1px solid ${token.line}` }}
                    />
                    <Box>
                      <Typography sx={{ fontFamily: fontBody, fontSize: 14.5, fontWeight: 600, color: token.ink }}>
                        {item.hospital.name}
                      </Typography>
                      <Typography sx={{ fontFamily: fontBody, fontSize: 12.5, color: token.inkFaint }}>
                        {item.hospital.city}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                <TableCell sx={bodyCellSx}>
                  <Typography sx={{ fontFamily: fontBody, fontSize: 14.5, fontWeight: 600, color: token.ink }}>
                    {item.serviceName}
                  </Typography>
                  <Typography sx={{ fontFamily: fontBody, fontSize: 12.5, color: token.inkFaint }}>
                    {item.serviceDetails}
                  </Typography>
                </TableCell>

                <TableCell sx={bodyCellSx}>
                  <AmountPill value={item.actualBillAmount} tone="ink" />
                </TableCell>

                <TableCell sx={bodyCellSx}>
                  <AmountPill value={item.offerAmount} tone="emerald" />
                </TableCell>

                <TableCell sx={bodyCellSx}>
                  <AmountPill value={item.finalAmount} tone="rose" />
                </TableCell>

                <TableCell sx={bodyCellSx}>
                  <Typography sx={{ fontFamily: fontMono, fontSize: 13, color: token.inkSoft }}>
                    {new Date(item.usedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </Typography>
                </TableCell>

                <TableCell sx={bodyCellSx}>
                  {item.bill_Url ? (
                    <Button
                      href={item.bill_Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      endIcon={<ArrowOutwardRoundedIcon sx={{ fontSize: "14px !important" }} />}
                      sx={{
                        fontFamily: fontBody,
                        fontSize: 12.5,
                        fontWeight: 600,
                        textTransform: "none",
                        color: token.goldDeep,
                        bgcolor: token.goldSoft,
                        px: 1.5,
                        borderRadius: "8px",
                        "&:hover": { bgcolor: token.goldSoft, opacity: 0.85 },
                      }}
                    >
                      View
                    </Button>
                  ) : (
                    <Stack direction="row" spacing={0.6} alignItems="center" sx={{ color: token.inkFaint }}>
                      <InsertDriveFileRoundedIcon sx={{ fontSize: 15 }} />
                      <Typography sx={{ fontFamily: fontBody, fontSize: 12.5 }}>No bill</Typography>
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ServiceUsed;