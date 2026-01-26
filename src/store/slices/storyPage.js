import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchstorypagePosts = createAsyncThunk("storypage/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/stories_page?per_page=1`);
  const data = await res.json();
  return data;
});

const storypageSlice = createSlice({
  name: "storypage",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchstorypagePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchstorypagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchstorypagePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectstorypagePosts = state => state.storypage.posts;
export const selectstorypageLoading = state => state.storypage.loading;

export default storypageSlice.reducer;
