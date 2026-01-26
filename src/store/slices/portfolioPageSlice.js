import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchportfolioPagePosts = createAsyncThunk("portfolioPage/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/portfolio_page?per_page=1`);
  const data = await res.json();
  return data;
});

const portfolioPageSlice = createSlice({
  name: "portfolioPage",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchportfolioPagePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchportfolioPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchportfolioPagePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectportfolioPagePosts = state => state.portfolioPage.posts;
export const selectportfolioPageLoading = state => state.portfolioPage.loading;

export default portfolioPageSlice.reducer;
