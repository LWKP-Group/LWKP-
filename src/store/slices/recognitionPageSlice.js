import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchrecognitionPagePosts = createAsyncThunk("recognitionPage/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/recognition_page?per_page=1`);
  const data = await res.json();
  return data;
});

const recognitionPageSlice = createSlice({
  name: "recognitionPage",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchrecognitionPagePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchrecognitionPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchrecognitionPagePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectrecognitionPagePosts = state => state.recognitionPage.posts;
export const selectrecognitionPageLoading = state => state.recognitionPage.loading;

export default recognitionPageSlice.reducer;
