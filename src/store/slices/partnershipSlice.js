import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch ALL years for dropdown
export const fetchPartnershipYears = createAsyncThunk("partnership/fetchYears", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/partnership?per_page=100&_fields=acf`);
  const data = await res.json();

  const years = data.map((item) => (item?.acf?.partnership_date || "").split(" ").pop()).filter(Boolean);

  return [...new Set(years)].sort((a, b) => b - a);
});

// Fetch paginated + filtered data
export const fetchpartnershipPosts = createAsyncThunk(
  "partnership/fetchPosts",
  async ({ page = 1, keyword = "", year = "" }) => {
    let url = `${process.env.NEXT_PUBLIC_WP_API}/partnership?page=${page}&per_page=12&orderby=date&order=desc`;

    if (keyword) url += `&search=${encodeURIComponent(keyword)}`;
    if (year) url += `&partnership_year=${encodeURIComponent(year)}`;

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

const partnershipSlice = createSlice({
  name: "partnership",
  initialState: {
    posts: [],
    total: 0,
    years: [],
    page: 1,
    loading: false,
    loadingYears: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchpartnershipPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchpartnershipPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchpartnershipPosts.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchPartnershipYears.pending, (state) => {
        state.loadingYears = true;
      })
      .addCase(fetchPartnershipYears.fulfilled, (state, action) => {
        state.loadingYears = false;
        state.years = action.payload;
      });
  },
});

export const selectpartnershipYears = (s) => s.partnership.years;
export const selectpartnershipPosts = (s) => s.partnership.posts;
export const selectpartnershipTotal = (s) => s.partnership.total;
export const selectpartnershipLoading = (s) => s.partnership.loading;
export const selectpartnershipLoadingYears = (s) => s.partnership.loadingYears;

export default partnershipSlice.reducer;
