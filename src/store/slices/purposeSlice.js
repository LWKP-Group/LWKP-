import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchpurposePosts = createAsyncThunk("purpose/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/purpose?per_page=1`);
  const data = await res.json();
  return data;
});

const purposeSlice = createSlice({
  name: "purpose",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchpurposePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchpurposePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchpurposePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectpurposePosts = state => state.purpose.posts;
export const selectpurposeLoading = state => state.purpose.loading;

export default purposeSlice.reducer;
