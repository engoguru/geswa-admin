import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
    Box,
    Button,
    Typography,
    TextField,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip,
    CircularProgress
} from "@mui/material";
import { Edit, Visibility, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemberPlans } from "../../../redux/slice/memberShipSlice";

function MemberPlanMain() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { plans, loading, pagination } = useSelector(
        (state) => state.memberPlan
    );

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        dispatch(getMemberPlans({
            page: page + 1,
            limit,
            search
        }));
    }, [dispatch, page, limit, search]);

    return (
        <MainLayout>
            <Box>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <Typography variant="h5" fontWeight={600}>
                        Membership Plans
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={() => navigate("/member-plan/create")}
                    >
                        Create Plan
                    </Button>
                </Box>

                <TextField
                    size="small"
                    placeholder="Search plan..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(0);
                    }}
                    sx={{ mb: 3 }}
                />

                <Paper>
                    {
                        loading ? (
                            <Box height={300} display="flex" justifyContent="center" alignItems="center">
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <TableContainer>
                                    <Table>

                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>Duration</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell align="center">Action</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                plans?.length > 0 ? (
                                                    plans.map((plan, index) => (
                                                        <TableRow key={plan.id}>

                                                            <TableCell>
                                                                {page * limit + index + 1}
                                                            </TableCell>

                                                            <TableCell>
                                                                <Typography fontWeight={600}>
                                                                    {plan.name}
                                                                </Typography>

                                                                <Typography variant="caption" color="text.secondary">
                                                                    {plan.description}
                                                                </Typography>
                                                            </TableCell>

                                                            <TableCell>
                                                                ₹ {plan.price}
                                                            </TableCell>

                                                            <TableCell>
                                                                {
                                                                    plan.durationUnit === "LIFETIME"
                                                                        ? "Lifetime"
                                                                        : `${plan.durationValue} ${plan.durationUnit}`
                                                                }
                                                            </TableCell>

                                                            <TableCell>
                                                                <Chip
                                                                    label={plan.isActive ? "Active" : "Inactive"}
                                                                    color={plan.isActive ? "success" : "error"}
                                                                    size="small"
                                                                />
                                                            </TableCell>

                                                            <TableCell align="center">

                                                                <IconButton color="primary">
                                                                    <Visibility />
                                                                </IconButton>

                                                                <IconButton
                                                                    color="warning"
                                                                    onClick={() => navigate(`/member-plan/create?id=${plan.id}`)}
                                                                >
                                                                    <Edit />
                                                                </IconButton>

                                                                <IconButton color="error">
                                                                    <Delete />
                                                                </IconButton>

                                                            </TableCell>

                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={6} align="center">
                                                            No plans found
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </TableBody>

                                    </Table>
                                </TableContainer>

                                <TablePagination
                                    component="div"
                                    count={pagination?.total || 0}
                                    page={page}
                                    onPageChange={(e, newPage) => setPage(newPage)}
                                    rowsPerPage={limit}
                                    onRowsPerPageChange={(e) => {
                                        setLimit(Number(e.target.value));
                                        setPage(0);
                                    }}
                                    rowsPerPageOptions={[5, 10, 20, 50]}
                                />
                            </>
                        )
                    }
                </Paper>

            </Box>
        </MainLayout>
    );
}

export default MemberPlanMain;