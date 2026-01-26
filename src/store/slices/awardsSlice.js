import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchawardsPosts = createAsyncThunk("awards/fetchPosts", async ({ page = 1, keyword = "", year = "" }) => {
  let url = `${process.env.NEXT_PUBLIC_WP_API}/awards?page=${page}&per_page=12`;

  if (keyword) url += `&search=${encodeURIComponent(keyword)}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    posts: data,
    total: Number(res.headers.get("X-WP-Total")) || 0,
    page
  };
});

const awardsSlice = createSlice({
  name: "awards",
  initialState: {
    posts: [],
    total: 0,
    page: 1,
    loading: false
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchawardsPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchawardsPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchawardsPosts.rejected, state => {
        state.loading = false;
      });
  }
});

export const selectawardsPosts = s => s.awards.posts;
export const selectawardsTotal = s => s.awards.total;
export const selectawardsPage = s => s.awards.page;
export const selectawardsLoading = s => s.awards.loading;

export default awardsSlice.reducer;
