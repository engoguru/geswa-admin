import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";


const initialState = {
    services: [],
    userServices: [],
    service: null,
    loading: false,
    error: null
};

// Create
export const createMembershipService = createAsyncThunk(
    "membershipService/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${baseUrl}membership-service/create`,
                data,
                { withCredentials: true }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Server Error"
            );
        }
    }
);

// Get All hospita wise
export const getAllMembershipService = createAsyncThunk(
    "membershipService/getAll",
    async (hospitalId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${baseUrl}membership-service/hospital-wise/${hospitalId}`,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Server Error"
            );
        }
    }
);

// getAll user wise service

export const getAllMembershipServiceUser = createAsyncThunk(
    "membershipService/getAllUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${baseUrl}membership-service/purchase-user/${userId}`,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Server Error"
            );
        }
    }
);
// Get One
export const getMembershipService = createAsyncThunk(
    "membershipService/getOne",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${baseUrl}membership-service/${id}`,
                { withCredentials: true }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Server Error"
            );
        }
    }
);

const membershipServiceSlice = createSlice({
    name: "membershipService",
    initialState,

    reducers: {
        clearService: (state) => {
            state.service = null;
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(createMembershipService.pending, (state) => {
                state.loading = true;
            })
            .addCase(createMembershipService.fulfilled, (state, action) => {
                state.loading = false;
                state.service = action.payload.data;
            })
            .addCase(createMembershipService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getAllMembershipService.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllMembershipService.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload.data;
            })
            .addCase(getAllMembershipService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //user sies
            .addCase(getAllMembershipServiceUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllMembershipServiceUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userServices = action.payload.data;
            })
            .addCase(getAllMembershipServiceUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })




            .addCase(getMembershipService.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMembershipService.fulfilled, (state, action) => {
                state.loading = false;
                state.service = action.payload.data;
            })
            .addCase(getMembershipService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearService } = membershipServiceSlice.actions;
export default membershipServiceSlice.reducer;