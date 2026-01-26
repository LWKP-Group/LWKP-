import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchcareerPagePosts = createAsyncThunk("careerPage/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/career_page?per_page=1`);
  const data = await res.json();
  return data;
});

const careerPageSlice = createSlice({
  name: "careerPage",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchcareerPagePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchcareerPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchcareerPagePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectcareerPagePosts = state => state.careerPage.posts;
export const selectcareerPageLoading = state => state.careerPage.loading;

export default careerPageSlice.reducer;
