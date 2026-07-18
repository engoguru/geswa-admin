import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { oneUser, updateuser } from "../../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { Box, Badge, Paper, Typography, Grid, TextField, Avatar, Button, AppBar, Tabs, Tab, Select, MenuItem } from "@mui/material";
import EmployeeRegister from "./EmployeeRegister";
import AssignedRole from "./AssignedRole";
import { toast } from "react-toastify";
import AssignHospital from "./AssignHospital";
import ServiceUsed from "./ServiceUsed";
import PremiumDetail from "./PremiumDetail";

function UserDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [tab, setTab] = useState(0);
    const { oneUserData } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        address: "",
    });

    useEffect(() => {
        dispatch(oneUser(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (oneUserData?.data) {
            setFormData({
                name: oneUserData?.data?.name || "",
                email: oneUserData?.data?.email || "",
                phone: oneUserData?.data?.contact || "",
                role: oneUserData?.data?.role || "",
                // isVerified: oneUserData?.data?.isVerified || "",
            });
        }
    }, [oneUserData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async () => {
        try {
            const response = await dispatch(
                updateuser({
                    id,
                    formData,
                })
            ).unwrap();

            console.log(response);

            // Optional
            toast.success(response?.message || "User updated successfully");
            // navigate("/users");
        } catch (error) {
            console.error(error);

        }
    };
    const roles = [
        "MEMBER",
        "EMPLOYEE",
        "HOSPITAL",
        "ADMIN",
    ];

    const handletabChange = (event, newValue) => {

        setTab(newValue);

    };
    const role = formData?.role;
    console.log(tab, "po")
    return (
        <MainLayout>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    px: 2,
                    py: 4,
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        width: "100%",
                        maxWidth: 900,
                        p: {
                            xs: 2,
                            sm: 3,
                            md: 5,
                        },
                        borderRadius: 4,
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",
                            mb: 5,
                        }}
                    >

                        <Avatar
                            sx={{
                                width: 60,
                                height: 60,
                                mb: 2,
                                fontSize: 20,
                                bgcolor: "primary.main",
                            }}
                        >
                            {formData?.name?.charAt(0)}
                        </Avatar>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            badgeContent={
                                oneUserData?.data?.isVerified === true ? (
                                    <VerifiedIcon color="success" />
                                ) : (
                                    <NewReleasesIcon color="error" />
                                )
                            }
                        ></Badge>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            textAlign="center"
                        >
                            User Details
                        </Typography>
                    </Box>

                    {/* Form */}
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                variant="outlined"
                                size="small"
                                color="primary"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                variant="outlined"
                                size="small"
                                color="primary"

                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                variant="outlined"
                                size="small"
                                color="primary"

                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/*             <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                sx={{
                                    py: 1
                                }}
                                variant="outlined"
                                size="small"
                                color="primary"
                                label="Role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            />
                        </Grid>

*/}
                        <Grid item xs={12} md={6}>
                            {/* <FormControl fullWidth size="small" sx={{ py: 1 }}> */}
                            {/* <InputLabel>Role</InputLabel> */}
                            <Select
                                label="Role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* </FormControl> */}
                        </Grid>

                        <Grid item xs={12} sx={{ py: 1 }}>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handleSubmit}
                                sx={{
                                    py: 1,
                                    fontSize: "12px",
                                    borderRadius: 2,
                                }}
                            >
                                Update User
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                {/* tabs section */}
                <Paper sx={{ mb: 2, mt: 2 }}>
                    <Tabs value={tab} onChange={handletabChange}>
                        {role === "EMPLOYEE"
                            ? [
                                <Tab key="details" label="Details" />,
                                <Tab key="assigned_role" label="Assigned Role" />,
                                // <Tab key="attendance" label="Attendance" />,
                                // <Tab key="work" label="Work" />,
                            ]
                            : role === "MEMBER"
                                ? [<Tab key="Plan Details" label="Plan Details" />,
                                <Tab key="Service Detail" label="Service Detail" />
                                ]
                                : role === "Admin"
                                    ? [<Tab key="details" label="Details" />]

                                    : role === "HOSPITAL"
                                        ? [<Tab key="Assign Hospital" label="Assign Hospital" />]


                                        : []}

                    </Tabs>
                </Paper>
            </Box>
            {/* Render Component */}
            <Box mt={2}>
                {/* <EmployeeRegister */}
                {role === "EMPLOYEE" && (
                    <>
                        {tab === 0 && <EmployeeRegister userId={id} />}
                        {tab === 1 && <AssignedRole userId={id} />}
                        {tab === 2 && <EmployeeWork />}
                    </>
                )}

                {role === "MEMBER" && (
                    <>
                        {tab === 0 && <PremiumDetail userId={id} />}
                        {tab === 1 && <ServiceUsed userId={id}/>}
                    </>
                )}

                {role === "ADMIN" && (
                    <>
                        {tab === 0 && <EmployeeRegister userId={id} />}
                    </>
                )}

                {role === "HOSPITAL" && (
                    <>
                        {tab === 0 && <AssignHospital userId={id} />}
                    </>
                )}
            </Box>
        </MainLayout>
    );
}

export default UserDetail;