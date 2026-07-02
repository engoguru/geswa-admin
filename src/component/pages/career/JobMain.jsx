import React, { useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import {
    Box,
    Paper,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob, viewAllJob } from "../../../redux/slice/careerslice";

function JobMain() {
    const navigate = useNavigate()
    const applicants = [
        {
            id: 1,
            name: "Amit Kumar",
            email: "amit@gmail.com",
            contact: "6307131152",
            role: "IT",
        },
        {
            id: 2,
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            contact: "9876543210",
            role: "HR",
        },
        {
            id: 3,
            name: "Priya Singh",
            email: "priya@gmail.com",
            contact: "9123456780",
            role: "Marketing",
        },
    ];
    const dispatch = useDispatch()

    const { jobs } = useSelector((state) => state.career)

    useEffect(() => {
        dispatch(viewAllJob())
    }, [])

    const handleDelete = async (id) => {
        try {

           await dispatch(deleteJob(id))
            navigate(0)
          
        } catch (error) {
            console.log(error)
        }
    }
    //   viewAllJob 

    console.log(jobs)
    return (
        <MainLayout>
            <Box sx={{ p: 3 }}>
                {/* Header Section */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        mb: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField
                            size="small"
                            placeholder="Search applicants..."
                        />
                        <Button
                            variant="contained"
                            startIcon={<SearchIcon />}
                        >
                            Search
                        </Button>
                    </Box>

                    <Button
                        component={Link}
                        to="/career"
                        variant="contained"
                        color="primary"
                    >
                        All Applicant
                    </Button>
                </Paper>

                {/* Table Section */}
                <Paper elevation={3}>
                    <Box sx={{
                        p: 2, display: "flex", justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Typography variant="h6" fontWeight={600}>
                            Current Opening
                        </Typography>
                        <Typography variant="h6" fontWeight={400} component={Link}
                            to="/new-opening">
                            Add New
                        </Typography>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>S.No.</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Title</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Salary Range</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Location</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Experience</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Publish</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Action</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {jobs?.map((applicant, index) => (
                                    <TableRow key={applicant.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{applicant.title}</TableCell>
                                        <TableCell>{applicant.salaryRange}</TableCell>
                                        <TableCell>{applicant.location}</TableCell>
                                        <TableCell>{applicant.experience}</TableCell>
                                        <TableCell>
                                            {new Date(applicant.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        {/* experience */}

                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                                component={Link}
                                                to={`/one-job/${applicant.id}`}
                                            >
                                                View
                                            </Button>

                                            <Button
                                                size="small"
                                                sx={{ mx: "5px" }}
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleDelete(applicant.id)}
                                            >
                                                delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </MainLayout>
    );
}

export default JobMain;