import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAwardsYears = createAsyncThunk("awards/fetchYears", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/awards?per_page=100&_fields=acf`);
  const data = await res.json();

  const years = data.map((item) => (item?.acf?.awards_date || "").split(" ").pop()).filter(Boolean);

  return [...new Set(years)].sort((a, b) => b - a);
});

export const fetchawardsPosts = createAsyncThunk("awards/fetchPosts", async ({ page = 1, keyword = "", year = "" }) => {
  let url = `${process.env.NEXT_PUBLIC_WP_API}/awards?page=${page}&per_page=12&orderby=date&order=desc`;

  if (keyword) url += `&search=${encodeURIComponent(keyword)}`;
  if (year) url += `&awards_year=${encodeURIComponent(year)}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    posts: data,
    total: Number(res.headers.get("X-WP-Total")) || 0,
    page,
    keyword,
    year,
  };
});

const awardsSlice = createSlice({
  name: "awards",
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
      .addCase(fetchawardsPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchawardsPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchawardsPosts.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchAwardsYears.pending, (state) => {
        state.loadingYears = true;
      })
      .addCase(fetchAwardsYears.fulfilled, (state, action) => {
        state.loadingYears = false;
        state.years = action.payload;
      });
  },
});

export const selectAwardsYears = (s) => s.awards.years;
export const selectAwardsPosts = (s) => s.awards.posts;
export const selectAwardsTotal = (s) => s.awards.total;
export const selectAwardsLoading = (s) => s.awards.loading;
export const selectAwardsLoadingYears = (s) => s.awards.loadingYears;

export default awardsSlice.reducer;
