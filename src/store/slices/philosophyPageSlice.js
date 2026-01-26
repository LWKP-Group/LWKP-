import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchphilsophyPagePosts = createAsyncThunk("philsophyPage/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/philosophy_page?per_page=1`);
  const data = await res.json();
  return data;
});

const philsophyPageSlice = createSlice({
  name: "philsophyPage",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchphilsophyPagePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchphilsophyPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchphilsophyPagePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectphilsophyPagePosts = state => state.philsophyPage.posts;
export const selectphilsophyPageLoading = state => state.philsophyPage.loading;

export default philsophyPageSlice.reducer;
