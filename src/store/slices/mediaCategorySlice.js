import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMediaCategories = createAsyncThunk("mediaCategories/fetch", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/media_category?per_page=100`);

  if (!res.ok) throw new Error("Failed to fetch media categories");
  return await res.json();
});

const mediaCategorySlice = createSlice({
  name: "mediaCategories",

  initialState: {
    categories: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMediaCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload || [];
      })
      .addCase(fetchMediaCategories.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load media categories";
      });
  },
});

export const selectMediaCategories = (s) => s.mediaCategories.categories;
export const selectMediaCategoriesLoading = (s) => s.mediaCategories.loading;

export default mediaCategorySlice.reducer;
