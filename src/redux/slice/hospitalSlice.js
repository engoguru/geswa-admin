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
            const response = await axios.get(`${baseUrl}hospital/viewOne/${id}`,{
                withCredentials:true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }

)

export const updateHospitals=createAsyncThunk(
    "hospitals/updateHospital",
    async ({id,data},{rejectWithValue})=>{
        try {
        console.log(data)
            const response=await axios.put(`${baseUrl}hospital/update/${id}`,data,{
                withCredentials:true
            })
            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }
)

export const createDoctors=createAsyncThunk(
    "doctors/createDoctor",
    async (doctorData,{rejectWithValue})=>{
        try {
            const response=await axios.post(`${baseUrl}hospital/add`,doctorData,{  
                withCredentials:true
            })  
            return response.data    
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }

)

const initialState = {
    hospitalAllData: [],
    createHospitalData: null,
    hospitalOneData: null,
    updateHospitalData:null,
    doctorsData:null,

    loading: false,
    error: null,
}

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


          builder.addCase(fetchOneHospital.pending,(state)=>{
            state.loading=true;
            state.error=null;   
          })  
          .addCase(fetchOneHospital.fulfilled,(state,action)=>{
            state.loading=false;
            state.hospitalOneData=action.payload.data;

          })
          .addCase(fetchOneHospital.rejected,(state)=>{
            state.loading=false;
            state.error="Failed to fetch hospital details";
          })



          
          builder.addCase(updateHospitals.pending,(state)=>{
            state.loading=true;
            state.error=null;   
          })  
          .addCase(updateHospitals.fulfilled,(state,action)=>{
            state.loading=false;
            state.hospitalOneData=action.payload.data;

          })
          .addCase(updateHospitals.rejected,(state)=>{
            state.loading=false;
            state.error="Failed to fetch hospital details";
          })

        builder.addCase(createDoctors.pending,(state)=>{
            state.loading=true;
            state.error=null;   
          })  
          .addCase(createDoctors.fulfilled,(state,action)=>{
            state.loading=false;
            state.doctorsData=action.payload.data;

          })
          .addCase(createDoctors.rejected,(state)=>{
            state.loading=false;
            state.error="Failed to fetch hospital details";
          })


    }
})
export default hospitalSlice.reducer;
