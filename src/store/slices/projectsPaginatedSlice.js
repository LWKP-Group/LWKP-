import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjectsPaginated = createAsyncThunk("projectsPaginated/fetchPosts", async ({ page = 1 }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/projects?page=${page}&per_page=12&_embed`);

  const total = res.headers.get("X-WP-Total");
  const data = await res.json();

  return {
    data,
    total: Number(total) || 0
  };
});

const projectsPaginatedSlice = createSlice({
  name: "projectsPaginated",
  initialState: {
    posts: [],
    total: 0,
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchProjectsPaginated.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProjectsPaginated.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchProjectsPaginated.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

// 🔥 SELECTORS — SAME NAMING STYLE
export const selectProjectsPaginatedPosts = state => state.projectsPaginated.posts;

export const selectProjectsPaginatedLoading = state => state.projectsPaginated.loading;

export const selectProjectsPaginatedTotal = state => state.projectsPaginated.total;

export default projectsPaginatedSlice.reducer;
