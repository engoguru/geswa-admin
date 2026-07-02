import React, { useEffect, useState } from "react";

import {
    Grid,
    Paper,
    Typography,
    Stack,
    Box,
    Divider,
} from "@mui/material";

import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Groups2Icon from "@mui/icons-material/Groups2";

import MainLayout from "../../layout/MainLayout";
import UserData from "./UserData";
import RevenueLineChart from "./RevenueData";

function DashboardMain() {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Live Clock
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const time = currentTime.toLocaleTimeString();
    const day = currentTime.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    const year = currentTime.getFullYear();

    // Reusable Dashboard Card Style
    const dashboardCard = {
        p: 3,
        borderRadius: 4,
        height: "100%",
        background: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    };

    return (
        <MainLayout>
            {/* Page Heading */}


            {/* TOP SECTION */}
            {/* TOP SECTION */}
            <Grid container spacing={3} mb={3}>

                {/* CLOCK CARD */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%",
                            background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "0.3s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                            },
                        }}
                    >
                        <Box textAlign="center">
                            <AccessTimeFilledIcon sx={{ fontSize: 40, mb: 1 }} />

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{
                                    fontSize: {
                                        xs: "1.8rem",
                                        md: "2.3rem",
                                    },
                                }}
                            >
                                {time}
                            </Typography>

                            <Typography variant="body1">
                                {day}, {year}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* EVENT CARD */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%",
                            background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "0.3s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                            },
                        }}
                    >
                        <Box textAlign="center">
                            <EventAvailableIcon sx={{ fontSize: 40, mb: 1 }} />

                            <Typography variant="h6" fontWeight="bold">
                                Upcoming Event
                            </Typography>

                            <Typography variant="body1">
                                Team Meeting
                            </Typography>

                            <Typography variant="body2">
                                Friday • 10:00 AM
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* EMPLOYEE CARD */}
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%",
                            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "0.3s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                            },
                        }}
                    >
                        <Box textAlign="center">
                            <Groups2Icon sx={{ fontSize: 40, mb: 1 }} />

                            <Typography variant="h6" fontWeight="bold">
                                Active Employees
                            </Typography>

                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                sx={{ mt: 1 }}
                            >
                                128
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* CHARTS SECTION */}
            <Grid container spacing={3} mb={1}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={dashboardCard}>
                        {/* <Typography variant="h6" mb={2} fontWeight="bold">
                            User Statistics
                        </Typography> */}

                        <UserData />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={dashboardCard}>
                        {/* <Typography variant="h6" mb={2} fontWeight="bold">
                            Revenue Analytics
                        </Typography> */}

                        <RevenueLineChart />
                    </Paper>
                </Grid>
            </Grid>

            {/* INFO SECTION */}
            <Grid container spacing={3}>
                {[
                    "Recent Register User",
                    "Recent Register Employee",
                    "Top Performer Co-ordinator",
                    "Latest Premium Buyer",
                ].map((title, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6 }}>
                        <Paper sx={dashboardCard}>
                            <Typography variant="h6" fontWeight="bold">
                                {title}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mt={1}
                            >
                                No data available yet.
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </MainLayout>
    );
}

export default DashboardMain;