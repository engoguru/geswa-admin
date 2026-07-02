import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";


// CREATE EMPLOYEE API
export const createEmployee = createAsyncThunk(
    "user/createEmployee",
    async (formData, { rejectWithValue }) => {
        try {
            // baseUrl
            const res = await axios.post(
                `${baseUrl}employee/create`,
                formData,
                {
                    withCredentials: true
                }
            );

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);
// /view/:userId

// CREATE EMPLOYEE API
export const viewOneEmployee = createAsyncThunk(
    "user/viewEmployee",
    async (userId, { rejectWithValue }) => {
        try {
            // baseUrl
            const res = await axios.get(
                `${baseUrl}employee/view/${userId}`,
                {
                    withCredentials: true
                }
            );

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const updateEmployee = createAsyncThunk(
    "user/updateEmployee",
    async ({ userId, formData }, { rejectWithValue }) => {
        try {
            const res = await axios.put(
                `${baseUrl}employee/update/${userId}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);



const initialState = {
    loading: false,
    error: null,
    success: false,
    employee: null,
    employeeOne: null,
    employeeUpdate: null
};

export const employeeSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserInfo: (state) => {
            state.userInfo = null;
            state.error = null;
            state.loading = false;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(createEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.employee = action.payload;
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        builder
            .addCase(viewOneEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(viewOneEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.employeeOne = action.payload;
            })
            .addCase(viewOneEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.employeeUpdate = action.payload;
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


    },
});

export const { clearUserInfo } = employeeSlice.actions;
export default employeeSlice.reducer;