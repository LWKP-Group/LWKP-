import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 Helper: slug → taxonomy ID
const getCategoryIdBySlug = async (slug, wpLang) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/project_category?slug=${slug}&lang=${wpLang}`);

    const data = await res.json();

    return Array.isArray(data) && data.length ? data[0].id : null;
  } catch (e) {
    return null;
  }
};

export const fetchProjectsPaginated = createAsyncThunk(
  "projectsPaginated/fetchPosts",
  async ({ page = 1 } = {}, { getState }) => {
    const lang = getState().language?.currentLanguage || "en";

    const wpLang = lang === "ch" ? "zh-hans" : "en";

    // ✅ STEP 1: resolve slug → ID
    const featuredCatId = await getCategoryIdBySlug("featured", wpLang);

    if (!featuredCatId) {
      return { data: [], total: 0 };
    }

    // ✅ STEP 2: fetch projects by category ID
    const params = new URLSearchParams({
      page,
      per_page: 6,
      order: "desc",
      orderby: "date",
      _embed: true,
      project_category: featuredCatId,
      lang: wpLang,
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/projects?${params.toString()}`);

    const total = res.headers.get("X-WP-Total");
    const data = await res.json();

    return {
      data: Array.isArray(data) ? data : [],
      total: Number(total) || 0,
    };
  },
);

const projectsPaginatedSlice = createSlice({
  name: "projectsPaginated",

  initialState: {
    posts: [],
    total: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsPaginated.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProjectsPaginated.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.total = action.payload.total;
      })

      .addCase(fetchProjectsPaginated.rejected, (state) => {
        state.loading = false;
        state.posts = [];
        state.error = "Failed to load data";
      });
  },
});

export const selectProjectsPaginatedPosts = (s) => s.projectsPaginated.posts;

export const selectProjectsPaginatedLoading = (s) => s.projectsPaginated.loading;

export const selectProjectsPaginatedTotal = (s) => s.projectsPaginated.total;

export default projectsPaginatedSlice.reducer;
