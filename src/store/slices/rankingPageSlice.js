import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchrankingPagePosts = createAsyncThunk("rankingPage/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/ranking_page?per_page=1`);
  const data = await res.json();
  return data;
});

const rankingPageSlice = createSlice({
  name: "rankingPage",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchrankingPagePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchrankingPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchrankingPagePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectrankingPagePosts = state => state.rankingPage.posts;
export const selectrankingPageLoading = state => state.rankingPage.loading;

export default rankingPageSlice.reducer;
