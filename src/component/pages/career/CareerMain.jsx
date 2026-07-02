import React, { useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { Link } from "react-router-dom";
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
import { viewAllApplicant } from "../../../redux/slice/careerslice";

function JobMain() {
  const dispatch = useDispatch()



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

  const { allApplicant } = useSelector((state) => state?.career)
  useEffect(() => {
    dispatch(viewAllApplicant())

  }, [])

  console.log(allApplicant)
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
            to="/open-job"
            variant="contained"
            color="primary"
          >
           Open Job
          </Button>
        </Paper>

        {/* Table Section */}
        <Paper elevation={3}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Applicant List
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
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Contact</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Role</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Resume</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {allApplicant?.map((applicant, index) => (
                  <TableRow key={applicant.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{applicant.fullName}</TableCell>
                    <TableCell>{applicant.email}</TableCell>
                    <TableCell>{applicant.phone}</TableCell>
                    <TableCell>{applicant?.job?.title}</TableCell>
                    <TableCell>
                      {applicant?.resume_Url ? (
                        <a
                          href={applicant.resume_Url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                        </a>
                      ) : (
                        "No Resume"
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to={`/view/${applicant?.id}`}
                      >
                        View
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