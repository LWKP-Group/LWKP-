import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchawardsPagePosts = createAsyncThunk("awardsPage/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/award_page?per_page=1`);
  const data = await res.json();
  return data;
});

const awardsPageSlice = createSlice({
  name: "awardsPage",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchawardsPagePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchawardsPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchawardsPagePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectawardsPagePosts = state => state.awardsPage.posts;
export const selectawardsPageLoading = state => state.awardsPage.loading;

export default awardsPageSlice.reducer;
