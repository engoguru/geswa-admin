import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography,
    Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    createEmployee,
    updateEmployee,
    viewOneEmployee,
} from "../../../redux/slice/employee/employeeSlice";
import { useNavigate } from "react-router-dom";

function EmployeeRegister({ userId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { employeeOne } = useSelector((state) => state.employee);

    const [isEdit, setIsEdit] = useState(false);

    const [form, setForm] = useState({
        dob: "",
        highestEducation: "",
        address: "",
        state: "",
        district: "",
        pincode: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        branchName: "",
    });

    const [files, setFiles] = useState({
        profile: null,
        aadhar: null,
        pan: null,
    });

    // ================= VIEW EMPLOYEE =================
    useEffect(() => {
        if (userId) {
            dispatch(viewOneEmployee(userId));
        }
    }, [userId, dispatch]);

    // ================= SET DATA IN FORM =================
    useEffect(() => {
        if (employeeOne?.data) {
            const data = employeeOne.data;

            setIsEdit(true);

            setForm({
                userId: userId,
                dob: data.dob ? data.dob.split("T")[0] : "",
                highestEducation: data.highestEducation || "",
                address: data.address || "",
                state: data.state || "",
                district: data.district || "",
                pincode: data.pincode || "",
                bankName: data.bankName || "",
                accountNumber: data.accountNumber || "",
                ifscCode: data.ifscCode || "",
                branchName: data.branchName || "",
            });
        } else {
            setIsEdit(false);
        }
    }, [employeeOne, userId]);

    // ================= HANDLE INPUT =================
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // ================= HANDLE FILE =================
    const handleFileChange = (e) => {
        setFiles({
            ...files,
            [e.target.name]: e.target.files[0],
        });
    };

    // ================= SUBMIT (CREATE / UPDATE) =================
    const handleSubmit = async () => {
        const formData = new FormData();

        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });
         
        formData.append("userId",userId)
        if (files.profile) formData.append("profile", files.profile);
        if (files.aadhar) formData.append("aadhar", files.aadhar);
        if (files.pan) formData.append("pan", files.pan);

        try {
            let result;

            if (isEdit) {
                result = await dispatch(updateEmployee({ userId, formData }));
            } else {
                result = await dispatch(createEmployee(formData));
            }

            if (result.meta.requestStatus === "fulfilled") {
                alert(result.payload.message || "Success");
                navigate(0)
            } else {
                alert(result.payload || "Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6" mb={2}>
                {isEdit ? "Update Employee" : "Employee Registration"}
            </Typography>

            <Grid container spacing={2}>
                {/* DOB */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        type="date"
                        name="dob"
                        label="Date of Birth"
                        value={form.dob}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            max: new Date().toISOString().split("T")[0],
                        }}
                    />
                </Grid>

                {/* Education */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Highest Education"
                        name="highestEducation"
                        value={form.highestEducation}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Address */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="State"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="District"
                        name="district"
                        value={form.district}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Pincode"
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                    />
                </Grid>

                {/* BANK */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Bank Name"
                        name="bankName"
                        value={form.bankName}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Account Number"
                        name="accountNumber"
                        value={form.accountNumber}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="IFSC Code"
                        name="ifscCode"
                        value={form.ifscCode}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Branch Name"
                        name="branchName"
                        value={form.branchName}
                        onChange={handleChange}
                    />
                </Grid>

                {/* FILES */}
                {/* FILES */}
                <Grid item xs={12} md={4}>
                    <Typography>Profile</Typography>

                    {employeeOne?.data?.profileUrl && (
                        <a
                            href={employeeOne.data.profileUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: "block", marginBottom: "8px", color: "blue" }}
                        >
                            View Profile
                        </a>
                    )}

                    <input type="file" name="profile" onChange={handleFileChange} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography>Aadhar</Typography>

                    {employeeOne?.data?.aadharUrl && (
                        <a
                            href={employeeOne.data.aadharUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: "block", marginBottom: "8px", color: "blue" }}
                        >
                            View Aadhar
                        </a>
                    )}

                    <input type="file" name="aadhar" onChange={handleFileChange} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography>PAN</Typography>

                    {employeeOne?.data?.panUrl && (
                        <a
                            href={employeeOne.data.panUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: "block", marginBottom: "8px", color: "blue" }}
                        >
                            View PAN
                        </a>
                    )}

                    <input type="file" name="pan" onChange={handleFileChange} />
                </Grid>

                {/* BUTTON */}
                <Grid item xs={12}>
                    <Button variant="contained" fullWidth onClick={handleSubmit}>
                        {isEdit ? "Update Employee" : "Submit Employee"}
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default EmployeeRegister;