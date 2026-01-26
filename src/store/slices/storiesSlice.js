import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchstoriesPosts = createAsyncThunk("stories/fetchPosts", async ({ page = 1 }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/stories?page=${page}&per_page=10`);

  const total = res.headers.get("X-WP-Total");
  const data = await res.json();

  return {
    data,
    total: Number(total) || 0
  };
});

const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    posts: [],
    total: 0,
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchstoriesPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchstoriesPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchstoriesPosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectstoriesPosts = state => state.stories.posts;
export const selectstoriesLoading = state => state.stories.loading;
export const selectstoriesTotal = state => state.stories.total; // ⭐

export default storiesSlice.reducer;
