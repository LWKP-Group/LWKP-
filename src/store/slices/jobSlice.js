import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobs = createAsyncThunk("jobs/fetch", async ({ page = 1, category = "" }) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_WP_API}/jobs`);

  url.searchParams.set("page", page);
  url.searchParams.set("per_page", 20);

  if (category) {
    url.searchParams.set("job_category", category);
  }

  const res = await fetch(url.toString());
  const data = await res.json();

  return {
    data,
    total: Number(res.headers.get("X-WP-Total")) || 0
  };
});

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    posts: [],
    total: 0,
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchJobs.pending, state => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchJobs.rejected, state => {
        state.loading = false;
        state.error = "Failed to load jobs";
      });
  }
});

export const selectJobs = state => state.jobs.posts || [];
export const selectJobsTotal = state => state.jobs.total || 0;
export const selectJobsLoading = state => state.jobs.loading;

export default jobSlice.reducer;
