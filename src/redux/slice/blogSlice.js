import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";


export const createBlog = (
    createAsyncThunk("create/blogs", async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${baseUrl}blog/create`, data, {
                withCredentials: true
            })
            return res.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message)
        }
    })

)

export const viewaAllBlog = createAsyncThunk(
    "view/blogs",
    async ({ search = "" } = {}, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${baseUrl}blog/viewall`, {
                params: {
                    search,
                },
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

const initialState = {
    blogs: [],
    blogAll: [],
    oneBlog: null,
    loading: false,
    error: null
}

const blogSlice = (
    createSlice({
        name: 'blog',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(createBlog.pending, (state) => {
                    state.loading = true
                })
                .addCase(createBlog.fulfilled, (state, action) => {
                    state.loading = false
                    state.blogs = action.payload.blog
                })
                .addCase(createBlog.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload || action.error.message
                })



            builder.addCase(viewaAllBlog.pending, (state) => {
                state.loading = true
            })
                .addCase(viewaAllBlog.fulfilled, (state, action) => {
                    state.loading = false
                    state.blogAll = action.payload
                })
                .addCase(viewaAllBlog.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload || action.error.message
                })

        }
    })
)
export default blogSlice.reducer
