import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";


export const viewAllContact = (
    createAsyncThunk('contact/viewAllContact', async ({ search }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}contact/all-contact`,

                {
                    params: {
                        search
                    },
                    withCredentials: true
                })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })

)

export const viewOneContact = (
    createAsyncThunk('contact/viewOneContact', async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}contact/${id}`, { withCredentials: true })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })
)

export const updateContact = (
    createAsyncThunk('contact/updateContact', async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${baseUrl}contact/update/${id}`, data, { withCredentials: true })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })
)
const initialState = {
    contacts: [],

    oneContact: null,
    updateContact: null,

    loading: false,
    error: null
}

const contactSlice = (
    createSlice({
        name: 'contact',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(viewAllContact.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(viewAllContact.fulfilled, (state, action) => {
                    state.loading = false;
                    state.contacts = action.payload.contacts
                })
                .addCase(viewAllContact.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload || action.error.message
                });


            builder.addCase(viewOneContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
                .addCase(viewOneContact.fulfilled, (state, action) => {
                    state.loading = false;
                    state.oneContact = action.payload.contact
                })
                .addCase(viewOneContact.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload || action.error.message
                })


            builder.addCase(updateContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
                .addCase(updateContact.fulfilled, (state, action) => {
                    state.loading = false;
                    state.updateContact = action.payload.contact
                })
                .addCase(updateContact.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload || action.error.message
                })
        }
    })
)
export default contactSlice.reducer