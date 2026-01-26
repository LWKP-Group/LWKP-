import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchreviewsPosts = createAsyncThunk("reviews/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/reviews?per_page=100`);
  const data = await res.json();
  return data;
});

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchreviewsPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchreviewsPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchreviewsPosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectreviewsPosts = state => state.reviews.posts;
export const selectreviewsLoading = state => state.reviews.loading;

export default reviewsSlice.reducer;
