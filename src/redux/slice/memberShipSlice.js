import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const initialState = {
  plans: [],
  currentPlan: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  }
};

export const getMemberPlans = createAsyncThunk(
  "memberPlan/getPlans",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}plan/viewAll?page=${page}&limit=${limit}&search=${search}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);

export const getOneMemberPlan = createAsyncThunk(
  "memberPlan/getOneMemberPlan",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}plan/viewOne/${id}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);

export const createMemberPlan = createAsyncThunk(
  "memberPlan/createMemberPlan",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}plan/create`,
        formData
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);

export const updateMemberPlan = createAsyncThunk(
  "memberPlan/updateMemberPlan",
  async ({ id, data: formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}plan/update/${id}`,
        formData
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);

const memberPlanSlice = createSlice({
  name: "memberPlan",
  initialState,

  reducers: {
    clearCurrentPlan: (state) => {
      state.currentPlan = null;
    },

    clearMemberPlanError: (state) => {
      state.error = null;
    }
  },

  extraReducers: (builder) => {

    builder

      // Get All
      .addCase(getMemberPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMemberPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getMemberPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get One
      .addCase(getOneMemberPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneMemberPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlan = action.payload.data;
      })
      .addCase(getOneMemberPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createMemberPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMemberPlan.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createMemberPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateMemberPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMemberPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlan = action.payload.data;
      })
      .addCase(updateMemberPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
});

export const {
  clearCurrentPlan,
  clearMemberPlanError
} = memberPlanSlice.actions;

export default memberPlanSlice.reducer;