import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";



export const loginUser = (
    createAsyncThunk('user/loginUser', async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}user/login`, userData, { withCredentials: true })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })
)


// Async thunk to fetch user
export const verifieduser = createAsyncThunk(
    "user/fetchUser",
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(`${baseUrl}users/${userId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Something went wrong"
            );
        }
    }
);

// user this used for auth
export const verifiedUserRole = (
    createAsyncThunk('user/verifiedUser', async (_, { rejectWithValue }) => {
        try {

            const response = await axios.get(`${baseUrl}user/verifyUser`,
                {
                    withCredentials: true
                }
            )

            return response.data

        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message)
        }
    })
)

// All user 
export const allRegisterUser = (
    createAsyncThunk('user/allRegisterUser', async ({ search, userType }, { rejectWithValue }) => {
        try {
            // console.log(data, "ouo")
            const response = await axios.get(`${baseUrl}user/all-user`, {
                params: {
                    search,
                    userType,
                },
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })
)

// One User
export const oneUser = (
    createAsyncThunk('user/oneUser', async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}user/detail/${id}`, {
                withCredentials: true
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })
)

//log out user
export const logOutUser = (
    createAsyncThunk('user/logOutUser', async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}user/logout`, {}, {
                withCredentials: true

            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })
)


export const updateuser = createAsyncThunk(
    "user/update",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${baseUrl}user/update/${id}`,
                formData,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);


// Initial state
const initialState = {
    loginUserData: null,
    userInfo: null,
    allUserData: [],
    oneUserData: null,


    loginUserData: null,
    isloginLoading: false,
    authChecked: false,

    logoutData: null,


    loading: false,
    error: null,
};

// Slice
export const userSlice = createSlice({
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
            .addCase(verifieduser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifieduser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(verifieduser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });


        // loginUserData
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.loginUserData = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

        // allUserData
        builder.addCase(allRegisterUser.pending, (state) => {
            state.loading = true;
        })
            .addCase(allRegisterUser.fulfilled, (state, action) => {
                state.loading = false;
                state.allUserData = action.payload;
            })
            .addCase(allRegisterUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

        // oneUser detail
        builder.addCase(oneUser.pending, (state) => {
            state.loading = true;
        })
            .addCase(oneUser.fulfilled, (state, action) => {
                state.loading = false;
                state.oneUserData = action.payload;
            })
            .addCase(oneUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

        // logout user data
        builder.addCase(logOutUser.pending, (state) => {
            state.loading = true;
        })
            .addCase(logOutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.logoutData = action.payload;
                state.loginUserData = null;
            })
            .addCase(logOutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })



        // verified  logged user
        builder.addCase(verifiedUserRole.pending, (state) => {
            state.isloginLoading = true;
        });

        builder.addCase(verifiedUserRole.fulfilled, (state, action) => {
            state.isloginLoading = false;
            state.loginUserData = action.payload;
            state.authChecked = true;
        });

        builder.addCase(verifiedUserRole.rejected, (state) => {
            state.isloginLoading = false;
            state.loginUserData = null;
            state.authChecked = true;
        });
    },
});

// Export actions
export const { clearUserInfo } = userSlice.actions;

// Export reducer
export default userSlice.reducer;