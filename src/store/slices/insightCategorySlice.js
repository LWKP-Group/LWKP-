import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInsightCategories = createAsyncThunk("insightCategories/fetch", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/insight_category?per_page=100`);

  if (!res.ok) throw new Error("Failed to fetch categories");
  return await res.json();
});

const insightCategorySlice = createSlice({
  name: "insightCategories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsightCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInsightCategories.fulfilled, (state, action) => {
        state.loading = false;

        const desiredOrder = ["thought-leadership", "research-publication", "talk-panel", "newsroom"];

        const sorted = [...(action.payload || [])].sort((a, b) => {
          const ai = desiredOrder.indexOf(a.slug);
          const bi = desiredOrder.indexOf(b.slug);

          return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
        });

        state.categories = sorted;
      })
      .addCase(fetchInsightCategories.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load insight categories";
      });
  },
});

export const selectInsightCategories = (s) => s.insightCategories.categories;
export const selectInsightCategoriesLoading = (s) => s.insightCategories.loading;

export default insightCategorySlice.reducer;
