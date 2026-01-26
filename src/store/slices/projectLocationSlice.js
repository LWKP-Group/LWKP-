import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjectLocations = createAsyncThunk("projectLocations/fetch", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/project_loaction?per_page=100`);
  const data = await res.json();
  return data;
});

const projectLocationSlice = createSlice({
  name: "projectLocations",
  initialState: {
    locations: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchProjectLocations.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProjectLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchProjectLocations.rejected, state => {
        state.loading = false;
        state.error = "Failed to load project locations";
      });
  }
});

export const selectProjectLocations = state => state.projectLocations.locations;
export const selectProjectLocationsLoading = state => state.projectLocations.loading;

export default projectLocationSlice.reducer;
