import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjectsArchive = createAsyncThunk(
  "projectsArchive/fetchPosts",
  async ({ page = 1, keyword = "", type = null, location = null }) => {
    const params = new URLSearchParams({
      page,
      per_page: 9,
      order: "desc",
      orderby: "date",
      _embed: true,
    });

    if (keyword) params.append("search", keyword);

    // ✅ TYPE FILTER (already working)
    if (type) {
      params.append("project_type", type);
    }

    // ✅ LOCATION FILTER (FIXED — TYPO SAFE)
    if (location) {
      // try correct slug first
      params.append("project_location", location);

      // fallback for typo slug (VERY IMPORTANT)
      params.append("project_loaction", location);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/projects?${params.toString()}`);

    const total = res.headers.get("X-WP-Total");
    const data = await res.json();

    return {
      data: Array.isArray(data) ? data : [],
      total: Number(total) || 0,
    };
  },
);

const projectsArchiveSlice = createSlice({
  name: "projectsArchive",
  initialState: {
    posts: [],
    total: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsArchive.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectsArchive.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchProjectsArchive.rejected, (state) => {
        state.loading = false;
        state.posts = [];
      });
  },
});

export const selectProjectsArchivePosts = (s) => s.projectsArchive.posts;
export const selectProjectsArchiveLoading = (s) => s.projectsArchive.loading;
export const selectProjectsArchiveTotal = (s) => s.projectsArchive.total;

export default projectsArchiveSlice.reducer;
