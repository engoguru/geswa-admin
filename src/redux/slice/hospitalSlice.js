import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";



export const createHospitals = createAsyncThunk(
    "hospitals/createHospital",
    async (hospitalData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}hospital/create`, hospitalData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchAllHospitals = createAsyncThunk(
    "hospitals/fetchHospitals",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}hospital/viewAll`, { params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchOneHospital = createAsyncThunk(
    "hospitals/fetchOneHospital",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}hospital/viewOne/${id}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }

)

export const updateHospitals = createAsyncThunk(
    "hospitals/updateHospital",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            console.log(data)
            const response = await axios.put(`${baseUrl}hospital/update/${id}`, data, {
                withCredentials: true
            })
            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }
)

export const createDoctors = createAsyncThunk(
    "doctors/createDoctor",
    async (doctorData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}hospital/add`, doctorData, {
                withCredentials: true
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }

)

// Assigned 



// Assign hospital to user
export const assignedHospitalToUser = createAsyncThunk(
    "hospital/assignedHospitalToUser",
    async ({ userId, hospitalId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${baseUrl}hospital/assign-hospital`,
                { userId, hospitalId },
                {
                    withCredentials: true
                }
            );

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Assign hospital failed"
            );
        }
    }
);


// Get assigned hospital
export const getAssignedHospitalUser = createAsyncThunk(
    "hospital/getAssignedHospitalUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${baseUrl}hospital/assigned-hospital/${userId}`,
                {
                    withCredentials: true
                }
            );

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch assigned hospital failed"
            );
        }
    }
);


// Remove assigned hospital
export const removeAssignedHospitalUser = createAsyncThunk(
    "hospital/removeAssignedHospitalUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${baseUrl}hospital/remove-hospital/${userId}`,
                {
                    withCredentials: true
                }
            );

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Remove hospital assignment failed"
            );
        }
    }
);

// const initialState = {
//     hospitalAllData: [],
//     createHospitalData: null,
//     hospitalOneData: null,
//     updateHospitalData:null,
//     doctorsData:null,



//     loading: false,
//     error: null,
// }
const initialState = {
    hospitalAllData: [],
    createHospitalData: null,
    hospitalOneData: null,
    updateHospitalData: null,
    doctorsData: null,

    assignedHospitalData: null,

    loading: false,
    assignmentLoading: false,

    error: null,
    assignmentError: null,
};

const hospitalSlice = createSlice({
    name: "hospital",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllHospitals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllHospitals.fulfilled, (state, action) => {
                state.loading = false;
                state.hospitalAllData = action.payload.data;
            })
            .addCase(fetchAllHospitals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch hospitals";
            })

        builder.addCase(createHospitals.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(createHospitals.fulfilled, (state, action) => {
                state.loading = false;
                state.createHospitalData = action.payload.data;
            })
            .addCase(createHospitals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create hospital";
            })


        builder.addCase(fetchOneHospital.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchOneHospital.fulfilled, (state, action) => {
                state.loading = false;
                state.hospitalOneData = action.payload.data;

            })
            .addCase(fetchOneHospital.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch hospital details";
            })




        builder.addCase(updateHospitals.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(updateHospitals.fulfilled, (state, action) => {
                state.loading = false;
                state.hospitalOneData = action.payload.data;

            })
            .addCase(updateHospitals.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch hospital details";
            })

        builder.addCase(createDoctors.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(createDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.doctorsData = action.payload.data;

            })
            .addCase(createDoctors.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch hospital details";
            })



            // Assign hospital
            .addCase(assignedHospitalToUser.pending, (state) => {
                state.assignmentLoading = true;
            })
            .addCase(assignedHospitalToUser.fulfilled, (state, action) => {
                state.assignmentLoading = false;
                state.assignedHospitalData = action.payload.data;
            })
            .addCase(assignedHospitalToUser.rejected, (state, action) => {
                state.assignmentLoading = false;
                state.assignmentError = action.payload;
            })


            // Get assigned hospital
            .addCase(getAssignedHospitalUser.pending, (state) => {
                state.assignmentLoading = true;
            })
            .addCase(getAssignedHospitalUser.fulfilled, (state, action) => {
                state.assignmentLoading = false;
                state.assignedHospitalData = action.payload.data;
            })
            .addCase(getAssignedHospitalUser.rejected, (state, action) => {
                state.assignmentLoading = false;
                state.assignmentError = action.payload;
            })


            // Remove assigned hospital
            .addCase(removeAssignedHospitalUser.pending, (state) => {
                state.assignmentLoading = true;
            })
            .addCase(removeAssignedHospitalUser.fulfilled, (state) => {
                state.assignmentLoading = false;
                state.assignedHospitalData = null;
            })
            .addCase(removeAssignedHospitalUser.rejected, (state, action) => {
                state.assignmentLoading = false;
                state.assignmentError = action.payload;
            });



    }
})
export default hospitalSlice.reducer;
