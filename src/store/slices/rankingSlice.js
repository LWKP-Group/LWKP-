import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fetch all years
export const fetchRankingYears = createAsyncThunk("ranking/fetchYears", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/ranking?per_page=100&_fields=acf`);
  const data = await res.json();

  const years = data.map((item) => (item?.acf?.ranking_date || "").split(" ").pop()).filter(Boolean);

  return [...new Set(years)].sort((a, b) => b - a);
});

// fetch paginated posts
export const fetchrankingPosts = createAsyncThunk(
  "ranking/fetchPosts",
  async ({ page = 1, keyword = "", year = "" }) => {
    let url = `${process.env.NEXT_PUBLIC_WP_API}/ranking?page=${page}&per_page=12&orderby=date&order=desc`;

    if (keyword) url += `&search=${encodeURIComponent(keyword)}`;
    if (year) url += `&ranking_year=${encodeURIComponent(year)}`;

    const res = await fetch(url);
    const data = await res.json();

    return {
      posts: data,
      total: Number(res.headers.get("X-WP-Total")) || 0,
      page,
      keyword,
      year,
    };
  },
);

const rankingSlice = createSlice({
  name: "ranking",
  initialState: {
    posts: [],
    total: 0,
    page: 1,
    years: [],
    loading: false,
    loadingYears: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchrankingPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchrankingPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchrankingPosts.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchRankingYears.pending, (state) => {
        state.loadingYears = true;
      })
      .addCase(fetchRankingYears.fulfilled, (state, action) => {
        state.loadingYears = false;
        state.years = action.payload;
      });
  },
});

export const selectrankingYears = (s) => s.ranking.years;
export const selectrankingPosts = (s) => s.ranking.posts;
export const selectrankingTotal = (s) => s.ranking.total;
export const selectrankingLoading = (s) => s.ranking.loading;
export const selectrankingLoadingYears = (s) => s.ranking.loadingYears;

export default rankingSlice.reducer;
