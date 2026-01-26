import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchjobCategories = createAsyncThunk("jobCategories/fetch", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/job_category?per_page=12`);
  const data = await res.json();
  return data;
});

const jobCategorySlice = createSlice({
  name: "jobCategories",
  initialState: {
    categories: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchjobCategories.pending, state => {
        state.loading = true;
      })
      .addCase(fetchjobCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchjobCategories.rejected, state => {
        state.loading = false;
        state.error = "Failed to load job categories";
      });
  }
});

export const selectjobCategories = state => state.jobCategories.categories;
export const selectjobCategoriesLoading = state => state.jobCategories.loading;

export default jobCategorySlice.reducer;
