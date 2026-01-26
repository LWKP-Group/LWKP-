import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchpartnershipPosts = createAsyncThunk("partnership/fetchPosts", async ({ page = 1, keyword = "", year = "" }) => {
  let url = `${process.env.NEXT_PUBLIC_WP_API}/partnership?page=${page}&per_page=12`;

  if (keyword) url += `&search=${encodeURIComponent(keyword)}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    posts: data,
    total: Number(res.headers.get("X-WP-Total")) || 0,
    page
  };
});

const partnershipSlice = createSlice({
  name: "partnership",
  initialState: {
    posts: [],
    total: 0,
    page: 1,
    loading: false
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchpartnershipPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchpartnershipPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchpartnershipPosts.rejected, state => {
        state.loading = false;
      });
  }
});

export const selectpartnershipPosts = s => s.partnership.posts;
export const selectpartnershipTotal = s => s.partnership.total;
export const selectpartnershipPage = s => s.partnership.page;
export const selectpartnershipLoading = s => s.partnership.loading;

export default partnershipSlice.reducer;
