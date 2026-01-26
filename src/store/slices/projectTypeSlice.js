import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjectTypes = createAsyncThunk("projectTypes/fetch", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/project_type?per_page=100`);
  const data = await res.json();
  return data;
});

const projectTypeSlice = createSlice({
  name: "projectTypes",
  initialState: {
    types: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchProjectTypes.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProjectTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.types = action.payload;
      })
      .addCase(fetchProjectTypes.rejected, state => {
        state.loading = false;
        state.types = [];
        state.error = "Failed to load project types";
      });
  }
});

export const selectProjectTypes = state => state.projectTypes.types;
export const selectProjectTypesLoading = state => state.projectTypes.loading;

export default projectTypeSlice.reducer;
