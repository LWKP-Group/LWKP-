import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMediaUrl } from "@/lib/getMediaUrl";

/* 🔹 Fetch Taxonomy with ACF Image resolve */
export const fetchStoryCategories = createAsyncThunk("storyCategory/fetchCategories", async ({ page = 1 } = {}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/story_category?page=${page}&per_page=10`);

  if (!res.ok) {
    throw new Error("Failed to fetch story categories");
  }

  const total = res.headers.get("X-WP-Total");
  const data = await res.json();

  // Resolve ACF Media Image
  const resolvedData = await Promise.all(
    data.map(async (item) => {
      const mediaId = item?.acf?.image;
      const mediaUrl = await getMediaUrl(mediaId);

      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description || "",
        image: mediaUrl || null,
        link: item.link,
        count: item.count,
      };
    })
  );

  return {
    data: resolvedData,
    total: Number(total) || 0,
  };
});

const storyCategorySlice = createSlice({
  name: "storyCategory",
  initialState: {
    posts: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoryCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoryCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchStoryCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to load data";
      });
  },
});

/* 🔹 Selectors */
export const selectStoryCategories = (state) => state.storyCategory.posts;
export const selectStoryCategoriesLoading = (state) => state.storyCategory.loading;
export const selectStoryCategoriesTotal = (state) => state.storyCategory.total;

export default storyCategorySlice.reducer;
