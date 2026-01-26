import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMediaPosts = createAsyncThunk("media/fetchPosts", async ({ page = 1, category = "all" }) => {
  let url = `${process.env.NEXT_PUBLIC_WP_API}/media_post?page=${page}&per_page=12`;

  if (category !== "all") {
    url += `&media_category=${category}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  return {
    posts: data,
    total: Number(res.headers.get("X-WP-Total")) || 0
  };
});

const mediaSlice = createSlice({
  name: "media",

  initialState: {
    posts: [],
    total: 0,
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchMediaPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMediaPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.total = action.payload.total;
      })
      .addCase(fetchMediaPosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load media posts";
      });
  }
});

export const selectMediaPosts = s => s.media.posts;
export const selectMediaTotal = s => s.media.total;
export const selectMediaLoading = s => s.media.loading;

export default mediaSlice.reducer;
