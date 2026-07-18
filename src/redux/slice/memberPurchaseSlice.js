import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";

const initialState = {
    purchase: null,
    purchaseData: null,
    purchaseAll:[],
    loading: false,
    error: null
};


export const createPurchasePlan = createAsyncThunk(
    "membershipPurchase/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${baseUrl}membership-purchase/create`,
                data,
                {
                    withCredentials: true
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

// userwise
export const getPurchasePlan = createAsyncThunk(
    "membershipPurchase/getOne",
    async (id, { rejectWithValue }) => {
        try {

            const response = await axios.get(
                `${baseUrl}membership-purchase/${id}`,
                {
                    withCredentials:true
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


export const getAllPurchasePlan = createAsyncThunk(
    "membershipPurchase/getAll",
    async (search = "", { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${base_Url}membership-purchase/viewAll`,
                {
                    params: { search },
                    withCredentials: true
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



const membershipPurchaseSlice = createSlice({

    name:"membershipPurchase",

    initialState,

    reducers:{
        clearPurchase:(state)=>{
            state.purchase=null;
            state.purchaseData=null;
        }
    },


    extraReducers:(builder)=>{

        builder

        // create purchase
        .addCase(createPurchasePlan.pending,(state)=>{
            state.loading=true;
        })

        .addCase(createPurchasePlan.fulfilled,(state,action)=>{
            state.loading=false;
            state.purchase=action.payload.data;
        })

        .addCase(createPurchasePlan.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })


        // get purchase
        .addCase(getPurchasePlan.pending,(state)=>{
            state.loading=true;
        })

        .addCase(getPurchasePlan.fulfilled,(state,action)=>{
            state.loading=false;
            state.purchaseData=action.payload.data;
        })

        .addCase(getPurchasePlan.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })



        

        // getAll purchase
        .addCase(getAllPurchasePlan.pending,(state)=>{
            state.loading=true;
        })

        .addCase(getAllPurchasePlan.fulfilled,(state,action)=>{
            state.loading=false;
            state.purchaseAll=action.payload.data;
        })

        .addCase(getAllPurchasePlan.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })

    }

});


export const {clearPurchase}=membershipPurchaseSlice.actions;

export default membershipPurchaseSlice.reducer;