import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchstudiolocationPosts = createAsyncThunk("studiolocation/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/studiolocation?per_page=100`);
  const data = await res.json();
  return data;
});

const studiolocationSlice = createSlice({
  name: "studiolocation",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchstudiolocationPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchstudiolocationPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchstudiolocationPosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectstudiolocationPosts = state => state.studiolocation.posts;
export const selectstudiolocationLoading = state => state.studiolocation.loading;

export default studiolocationSlice.reducer;
