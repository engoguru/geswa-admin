import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasePlan } from "../../../redux/slice/memberPurchaseSlice";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/*  Fonts: 'Fraunces' (display) + 'Inter' (body) + 'IBM Plex Mono'     */
/*  (utility / numerals). Load once, e.g. in index.html:               */
/*  <link href="https://fonts.googleapis.com/css2?family=Fraunces:     */
/*  opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@      */
/*  400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"    */
/*  rel="stylesheet">                                                   */
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
  navyDeep: "#151A24",
  navyMid: "#232B3B",
};

const fontDisplay = "'Fraunces', 'Georgia', serif";
const fontBody = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const fontMono = "'IBM Plex Mono', 'Roboto Mono', monospace";

/* ------------------------------------------------------------------ */
/*  Small presentational helpers                                       */
/* ------------------------------------------------------------------ */

function Eyebrow({ children, tone = "light" }) {
  return (
    <Typography
      sx={{
        fontFamily: fontBody,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: tone === "light" ? "rgba(255,255,255,0.5)" : token.inkFaint,
      }}
    >
      {children}
    </Typography>
  );
}

function StatusPill({ label, tone = "emerald" }) {
  const palette =
    tone === "emerald"
      ? { bg: token.emeraldSoft, fg: token.emerald }
      : { bg: token.goldSoft, fg: token.goldDeep };
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 1.5,
        py: 0.5,
        borderRadius: 999,
        bgcolor: palette.bg,
        color: palette.fg,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: palette.fg,
        }}
      />
      <Typography
        sx={{
          fontFamily: fontBody,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "capitalize",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ py: 0.9 }}>
      <Box sx={{ color: token.gold, mt: "2px", display: "flex" }}>{icon}</Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: fontBody,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: token.inkFaint,
            lineHeight: 1.6,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontFamily: fontBody,
            fontSize: 14.5,
            fontWeight: 500,
            color: token.ink,
            wordBreak: "break-word",
          }}
        >
          {value || "—"}
        </Typography>
      </Box>
    </Stack>
  );
}

function PanelHeader({ icon, title }) {
  return (
    <>
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "10px",
            display: "grid",
            placeItems: "center",
            bgcolor: token.goldSoft,
            color: token.goldDeep,
          }}
        >
          {icon}
        </Box>
        <Typography
          sx={{
            fontFamily: fontDisplay,
            fontSize: 19,
            fontWeight: 600,
            color: token.ink,
          }}
        >
          {title}
        </Typography>
      </Stack>
      <Divider sx={{ borderColor: token.line, mb: 2 }} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading state                                                       */
/* ------------------------------------------------------------------ */

function LoadingState() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: token.paper, minHeight: "100%" }}>
      <Skeleton
        variant="rounded"
        height={260}
        sx={{ borderRadius: "20px", mb: 3, bgcolor: "rgba(27,31,42,0.06)" }}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rounded" height={220} sx={{ borderRadius: "16px", bgcolor: "rgba(27,31,42,0.06)" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rounded" height={220} sx={{ borderRadius: "16px", bgcolor: "rgba(27,31,42,0.06)" }} />
        </Grid>
      </Grid>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

function PremiumDetail({ userId }) {
  const dispatch = useDispatch();
  const { purchaseData } = useSelector((state) => state.memberPurchase);

  useEffect(() => {
    if (userId) {
      dispatch(getPurchasePlan(userId));
    }
  }, [dispatch, userId]);

  if (!purchaseData) return <LoadingState />;

  const { membership, user, employeeAssignment } = purchaseData;

  const maskedId = String(purchaseData.memberId || "")
    .padStart(12, "0")
    .replace(/(.{4})/g, "$1 ")
    .trim();

  return (
    <Box sx={{ bgcolor: token.paper, minHeight: "100%", p: { xs: 2, md: 4 } }}>
      <Grid container spacing={3}>
        {/* ---------------- Membership hero / card ---------------- */}
        <Grid item xs={12}>
          <Box
            sx={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              p: { xs: 3, md: 5 },
              background: `linear-gradient(135deg, ${token.navyMid} 0%, ${token.navyDeep} 100%)`,
              boxShadow: "0 20px 45px -20px rgba(21,26,36,0.55)",
            }}
          >
            {/* foil edge */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${token.gold}, #E7C878, ${token.gold})`,
              }}
            />
            {/* watermark glyph */}
            <CreditCardRoundedIcon
              sx={{
                position: "absolute",
                right: { xs: -20, md: 8 },
                bottom: { xs: -20, md: -10 },
                fontSize: { xs: 140, md: 190 },
                color: "rgba(255,255,255,0.035)",
                transform: "rotate(-8deg)",
              }}
            />

            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "flex-start" }}
              spacing={2}
              sx={{ position: "relative", zIndex: 1 }}
            >
              <Box>
                <Eyebrow>Membership</Eyebrow>
                <Typography
                  sx={{
                    fontFamily: fontDisplay,
                    fontWeight: 600,
                    fontSize: { xs: 30, md: 38 },
                    color: "#FBFAF7",
                    lineHeight: 1.15,
                    mt: 0.5,
                  }}
                >
                  {membership.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fontBody,
                    fontSize: 15,
                    color: "rgba(255,255,255,0.55)",
                    mt: 0.5,
                  }}
                >
                  Valid {new Date(purchaseData.startDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  {"  –  "}
                  {new Date(purchaseData.endDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </Typography>
              </Box>

              <Stack alignItems={{ xs: "flex-start", md: "flex-end" }} spacing={1}>
                <StatusPill label={purchaseData.status} tone="emerald" />
                <Typography
                  sx={{
                    fontFamily: fontDisplay,
                    fontSize: 28,
                    fontWeight: 600,
                    color: token.gold,
                  }}
                >
                  ₹{membership.price}
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 3.5 }} />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "flex-end" }}
              spacing={2.5}
              sx={{ position: "relative", zIndex: 1 }}
            >
              <Box>
                <Eyebrow>Member ID</Eyebrow>
                <Typography
                  sx={{
                    fontFamily: fontMono,
                    fontSize: { xs: 18, md: 21 },
                    letterSpacing: "0.12em",
                    color: "#FBFAF7",
                    mt: 0.5,
                  }}
                >
                  {maskedId}
                </Typography>
              </Box>

              <Stack direction="row" spacing={3}>
                <Box>
                  <Eyebrow>Payment</Eyebrow>
                  <Typography sx={{ fontFamily: fontBody, fontSize: 14, fontWeight: 600, color: "#FBFAF7", mt: 0.5 }}>
                    {purchaseData.paymentStatus}
                  </Typography>
                </Box>
                <Box>
                  <Eyebrow>Mode</Eyebrow>
                  <Typography sx={{ fontFamily: fontBody, fontSize: 14, fontWeight: 600, color: "#FBFAF7", mt: 0.5 }}>
                    {purchaseData.paymentMethod}
                  </Typography>
                </Box>
                <Box>
                  <Eyebrow>Paid</Eyebrow>
                  <Typography sx={{ fontFamily: fontBody, fontSize: 14, fontWeight: 600, color: "#FBFAF7", mt: 0.5 }}>
                    ₹{purchaseData.amountPaid}
                  </Typography>
                </Box>
              </Stack>
            </Stack>

            {/* Benefits */}
            {membership.benefits?.length > 0 && (
              <Box sx={{ position: "relative", zIndex: 1, mt: 3.5 }}>
                <Eyebrow>Benefits</Eyebrow>
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
                  {membership.benefits.map((item, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      spacing={0.6}
                      sx={{
                        px: 1.4,
                        py: 0.6,
                        borderRadius: 999,
                        bgcolor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <CheckRoundedIcon sx={{ fontSize: 14, color: token.gold }} />
                      <Typography sx={{ fontFamily: fontBody, fontSize: 12.5, color: "rgba(255,255,255,0.85)" }}>
                        {item}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Grid>

        {/* ---------------- Member details ---------------- */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: token.surface,
              border: `1px solid ${token.line}`,
              height: "100%",
            }}
          >
            <PanelHeader icon={<PersonRoundedIcon fontSize="small" />} title="Member" />

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2.5 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: token.goldSoft,
                  color: token.goldDeep,
                  fontFamily: fontDisplay,
                  fontWeight: 600,
                  fontSize: 22,
                }}
              >
                {user.name?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Box>
                <Typography sx={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 600, color: token.ink }}>
                  {user.name}
                </Typography>
                <Typography sx={{ fontFamily: fontBody, fontSize: 13, color: token.inkSoft }}>
                  {user.role}
                </Typography>
              </Box>
            </Stack>

            <InfoRow icon={<MailOutlineRoundedIcon fontSize="small" />} label="Email" value={user.email} />
            <InfoRow icon={<PhoneRoundedIcon fontSize="small" />} label="Mobile" value={user.contact} />
          </Card>
        </Grid>

        {/* ---------------- Sales executive ---------------- */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: token.surface,
              border: `1px solid ${token.line}`,
              height: "100%",
            }}
          >
            <PanelHeader icon={<BadgeRoundedIcon fontSize="small" />} title="Sales Executive" />

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2.5 }}>
              <Avatar
                src={employeeAssignment.employee.profileUrl}
                sx={{
                  width: 56,
                  height: 56,
                  border: `2px solid ${token.gold}`,
                }}
              />
              <Box>
                <Typography sx={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 600, color: token.ink }}>
                  {employeeAssignment.employee.user.name}
                </Typography>
                <Typography sx={{ fontFamily: fontBody, fontSize: 13, color: token.inkSoft }}>
                  {employeeAssignment.role.name} · {employeeAssignment.department.name}
                </Typography>
              </Box>
            </Stack>

            <InfoRow icon={<MailOutlineRoundedIcon fontSize="small" />} label="Email" value={employeeAssignment.employee.user.email} />
            <InfoRow icon={<PhoneRoundedIcon fontSize="small" />} label="Mobile" value={employeeAssignment.employee.user.contact} />
            <InfoRow
              icon={<PlaceRoundedIcon fontSize="small" />}
              label="Territory"
              value={`${employeeAssignment.taluka.name}, ${employeeAssignment.district.name}, ${employeeAssignment.state.name}`}
            />
            <InfoRow icon={<PlaceRoundedIcon fontSize="small" />} label="Address" value={employeeAssignment.employee.address} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PremiumDetail;