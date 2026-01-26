import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchstudiopagePosts = createAsyncThunk("studiopage/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/studio_page?per_page=1`);
  const data = await res.json();
  return data;
});

const studiopageSlice = createSlice({
  name: "studiopage",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchstudiopagePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchstudiopagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchstudiopagePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectstudiopagePosts = state => state.studiopage.posts;
export const selectstudiopageLoading = state => state.studiopage.loading;

export default studiopageSlice.reducer;
