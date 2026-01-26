import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjectsArchive = createAsyncThunk("projectsArchive/fetchPosts", async ({ page = 1, keyword = "" }) => {
  const params = new URLSearchParams({
    page,
    per_page: 9
  });

  if (keyword) params.append("search", keyword);

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/projects?_embed&${params.toString()}`);

  const total = res.headers.get("X-WP-Total");
  const data = await res.json();

  return {
    data,
    total: Number(total) || 0
  };
});

const projectsArchiveSlice = createSlice({
  name: "projectsArchive",
  initialState: {
    posts: [],
    total: 0,
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProjectsArchive.pending, s => {
        s.loading = true;
      })
      .addCase(fetchProjectsArchive.fulfilled, (s, a) => {
        s.loading = false;
        s.posts = a.payload.data;
        s.total = a.payload.total;
      })
      .addCase(fetchProjectsArchive.rejected, s => {
        s.loading = false;
      });
  }
});

export const selectProjectsArchivePosts = s => s.projectsArchive.posts;
export const selectProjectsArchiveLoading = s => s.projectsArchive.loading;
export const selectProjectsArchiveTotal = s => s.projectsArchive.total;

export default projectsArchiveSlice.reducer;
