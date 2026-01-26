import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchrankingPosts = createAsyncThunk("ranking/fetchPosts", async ({ page = 1, keyword = "", year = "" }) => {
  let url = `${process.env.NEXT_PUBLIC_WP_API}/ranking?page=${page}&per_page=12`;

  if (keyword) url += `&search=${encodeURIComponent(keyword)}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    posts: data,
    total: Number(res.headers.get("X-WP-Total")) || 0,
    page
  };
});

const rankingSlice = createSlice({
  name: "ranking",
  initialState: {
    posts: [],
    total: 0,
    page: 1,
    loading: false
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchrankingPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchrankingPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchrankingPosts.rejected, state => {
        state.loading = false;
      });
  }
});

export const selectrankingPosts = s => s.ranking.posts;
export const selectrankingTotal = s => s.ranking.total;
export const selectrankingPage = s => s.ranking.page;
export const selectrankingLoading = s => s.ranking.loading;

export default rankingSlice.reducer;
