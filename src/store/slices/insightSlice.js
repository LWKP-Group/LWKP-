import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInsightPosts = createAsyncThunk("insight/fetchPosts", async ({ page = 1, categoryId = null }) => {
  let url = `${process.env.NEXT_PUBLIC_WP_API}/insight?page=${page}&per_page=9`;

  // 🔥 Send numeric ID to WordPress
  if (categoryId) {
    url += `&insight_category=${categoryId}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch insights");
  }

  const data = await res.json();

  return {
    posts: Array.isArray(data) ? data : [],
    total: Number(res.headers.get("X-WP-Total")) || 0,
  };
});

const insightSlice = createSlice({
  name: "insight",

  initialState: {
    posts: [],
    total: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchInsightPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInsightPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.total = action.payload.total;
      })
      .addCase(fetchInsightPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.posts = [];
      });
  },
});

export const selectInsightPosts = (state) => state.insight.posts;
export const selectInsightTotal = (state) => state.insight.total;
export const selectInsightLoading = (state) => state.insight.loading;

export default insightSlice.reducer;
