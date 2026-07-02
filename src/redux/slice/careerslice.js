import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

// Fetch all jobs
export const viewAllJob = createAsyncThunk(
    "jobs/viewAllJob",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${baseUrl}job/viewall-job`);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch jobs"
            );
        }
    }
);

// create  
export const createJob = createAsyncThunk(
    "jobs/Create",
    async (data, { rejectWithValue }) => {
        try {
            // console.log(data, "")
            const response = await axios.post(`${baseUrl}job/create`, data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch jobs"
            );
        }
    }
)

// view-one job
export const viewOneJob=createAsyncThunk(
    "job/viewOneJob",
    async(id,{ rejectWithValue })=>{
        try {
            const response=await axios.get(`${baseUrl}job/view-jobdetail/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
             return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch jobs"
            );
        }
    }
)

// delete job
export const deleteJob=createAsyncThunk(
    "job/deleteJob",
    async(id,{ rejectWithValue })=>{
        try {
            const response=await axios.delete(`${baseUrl}job/delete-job/${id}`,{
                withCredentials:true
            })
            return response.data
        } catch (error) {
            console.log(error)
             return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch jobs"
            );
        }
    }
)


// fetch All Applicant 
export const viewAllApplicant = createAsyncThunk(
    "jobs/viewAllApplicant",
    async (_, { rejectWithValue }) => {
        try {
            // console.log(data, "")
            const response = await axios.get(`${baseUrl}job/viewAll/application`,
                { withCredentials: true }
            )
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch jobs"
            );
        }
    }
)
// /viewAll/application/:id

export const viewAOneApplicant = createAsyncThunk(
    "jobs/viewOneApplicant",
    async (id, { rejectWithValue }) => {
        try {
            // console.log(data, "")
            const response = await axios.get(`${baseUrl}job/viewOne/application/${id}`,
                { withCredentials: true }
            )
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch jobs"
            );
        }
    }
)

export const updateApplicant = createAsyncThunk(
    "jobs/updateApplicant",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            console.log(status, "")
            const response=await axios.post(
  `${baseUrl}job/update/application/${id}`,
  { status },
  { withCredentials: true }
)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch jobs"
            );
        }
    }
)



const initialState = {
    jobs: [],
    newJobs: null,
    oneJobs:null,
    closeJob:null,
    // applicant
    allApplicant: [],
    oneApplicant: null,
    updateApplicantData: null,
    loading: false,
    error: null
}

const careerSlice = createSlice({
    name: "career",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(viewAllJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(viewAllJob.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload.data || action.payload;
            })
            .addCase(viewAllJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });


        builder
            .addCase(createJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.loading = false;
                state.newJobs = action.payload.data || action.payload;
            })
            .addCase(createJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });


     builder
            .addCase(viewOneJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(viewOneJob.fulfilled, (state, action) => {
                state.loading = false;
                state.oneJobs = action.payload.data || action.payload;
            })
            .addCase(viewOneJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });


     builder
            .addCase(deleteJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.loading = false;
                state.closeJob  = action.payload.data || action.payload;
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });















        builder
            .addCase(viewAllApplicant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(viewAllApplicant.fulfilled, (state, action) => {
                state.loading = false;
                state.allApplicant = action.payload.data || action.payload;
            })
            .addCase(viewAllApplicant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });


        builder.addCase(viewAOneApplicant.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(viewAOneApplicant.fulfilled, (state, action) => {
                state.loading = false;
                state.oneApplicant = action.payload.data || action.payload;
            })
            .addCase(viewAOneApplicant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });

        builder.addCase(updateApplicant.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(updateApplicant.fulfilled, (state, action) => {
                state.loading = false;
                state.updateApplicantData = action.payload.data || action.payload;
            })
            .addCase(updateApplicant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default careerSlice.reducer;