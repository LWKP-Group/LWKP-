import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchpeoplePagePosts = createAsyncThunk("peoplePage/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/people_page?per_page=1`);
  const data = await res.json();
  return data;
});

const peoplePageSlice = createSlice({
  name: "peoplePage",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchpeoplePagePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchpeoplePagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchpeoplePagePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectpeoplePagePosts = state => state.peoplePage.posts;
export const selectpeoplePageLoading = state => state.peoplePage.loading;

export default peoplePageSlice.reducer;
