import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    assignedHospitalToUser,
    fetchAllHospitals,
    getAssignedHospitalUser,
    removeAssignedHospitalUser,
  
} from "../../../redux/slice/hospitalSlice";

function AssignHospital({ userId }) {
    const dispatch = useDispatch();
    // const { hospitalAllData, assignedHospitalData } = useSelector((state) => state.hospital);
const {
    hospitalAllData,
    assignedHospitalData,
    assignmentLoading
} = useSelector((state) => state.hospital);
    const [search, setSearch] = useState("");
    const [selectedHospital, setSelectedHospital] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchAllHospitals({ search, page: 1, limit: 20 }));
        }, 400);

        return () => clearTimeout(timer);
    }, [search, dispatch]);

    useEffect(() => {
        if (userId) dispatch(getAssignedHospitalUser(userId));
      
    }, [userId, dispatch]);

    const handleAssign = () => {
        if (!selectedHospital) return;

        dispatch(assignedHospitalToUser({
            userId,
            hospitalId: selectedHospital.id
        }));
        // assignedHospitalToUser
    };

    const handleRemove = () => {
        dispatch(removeAssignedHospitalUser(userId));
        setSelectedHospital(null);
        // removeAssignedHospitalUser
    };

    return (
        <Box p={2}>
            <Typography variant="h6">Assign Hospital</Typography>

            <Autocomplete
                sx={{ mt: 2 }}
                options={hospitalAllData || []}
                getOptionLabel={(option) => option.name || ""}
                value={selectedHospital}
                onChange={(e, value) => setSelectedHospital(value)}
                onInputChange={(e, value) => setSearch(value)}
                renderInput={(params) => (
                    <TextField {...params} label="Search Hospital" />
                )}
            />

            <Button
                sx={{ mt: 2 }}
                variant="contained"
                disabled={!selectedHospital}
                onClick={handleAssign}
            >
                Assign
            </Button>

            {assignedHospitalData && (
                <Paper sx={{ mt: 3, p: 2 }}>
                    <Typography>
                        Assigned: {assignedHospitalData.hospital?.name}
                    </Typography>

                    <Button
                        sx={{ mt: 1 }}
                        color="error"
                        onClick={handleRemove}
                    >
                        Remove
                    </Button>
                </Paper>
            )}
        </Box>
    );
}

export default AssignHospital;