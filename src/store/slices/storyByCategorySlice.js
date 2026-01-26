import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStoriesByCategory = createAsyncThunk("storiesByCategory/fetch", async ({ id, page = 1 }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/stories?_embed&story_category=${id}&page=${page}&per_page=12`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch stories by category");
  }

  const total = res.headers.get("X-WP-Total");
  const data = await res.json();

  return {
    data,
    total: Number(total) || 0,
  };
});

const storyByCategorySlice = createSlice({
  name: "storiesByCategory",
  initialState: {
    posts: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoriesByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoriesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchStoriesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to load data";
      });
  },
});

export const selectStoriesByCategory = (state) => state.storiesByCategory.posts;
export const selectStoriesByCategoryLoading = (state) => state.storiesByCategory.loading;
export const selectStoriesByCategoryTotal = (state) => state.storiesByCategory.total;

export default storyByCategorySlice.reducer;
