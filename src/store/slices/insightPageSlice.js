import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchinsightPagePosts = createAsyncThunk("insightPage/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/insight_page?per_page=1`);
  const data = await res.json();
  return data;
});

const insightPageSlice = createSlice({
  name: "insightPage",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchinsightPagePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchinsightPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchinsightPagePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectinsightPagePosts = state => state.insightPage.posts;
export const selectinsightPageLoading = state => state.insightPage.loading;

export default insightPageSlice.reducer;
