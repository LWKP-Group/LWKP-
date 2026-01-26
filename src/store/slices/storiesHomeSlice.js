import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchhomestoriesPosts = createAsyncThunk("stories/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/stories?per_page=12`);
  const data = await res.json();
  return data;
});

const homestoriesSlice = createSlice({
  name: "homestories",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchhomestoriesPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchhomestoriesPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchhomestoriesPosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selecthomestoriesPosts = state => state.homestories.posts;
export const selecthomestoriesLoading = state => state.homestories.loading;

export default homestoriesSlice.reducer;
