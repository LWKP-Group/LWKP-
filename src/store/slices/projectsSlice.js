import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchprojectsPosts = createAsyncThunk("projects/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/projects?per_page=100`);
  const data = await res.json();
  return data;
});

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchprojectsPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchprojectsPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchprojectsPosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectprojectsPosts = state => state.projects.posts;
export const selectprojectsLoading = state => state.projects.loading;

export default projectsSlice.reducer;
