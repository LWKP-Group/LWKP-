import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchhomePagePosts = createAsyncThunk("homePage/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/home_page?per_page=1`);
  const data = await res.json();
  return data;
});

const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchhomePagePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchhomePagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchhomePagePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selecthomePagePosts = state => state.homePage.posts;
export const selecthomePageLoading = state => state.homePage.loading;

export default homePageSlice.reducer;
