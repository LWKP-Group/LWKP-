import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllPhilosophyPosts = createAsyncThunk("philosophyAll/fetchAllPosts", async (_, { getState }) => {
  const lang = getState().language?.currentLanguage || "en";

  const wpLang = lang === "ch" ? "zh-hans" : "en";

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/philosophy?lang=${wpLang}&per_page=100`);

  const data = await res.json();

  return data || [];
});

const philosophyAllSlice = createSlice({
  name: "philosophyAll",

  initialState: {
    posts: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPhilosophyPosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAllPhilosophyPosts.fulfilled, (state, action) => {
        state.loading = false;

        const customOrder = [
          "VISION FORGED",
          "LIVING NARRATIVES",
          "HERITAGE WOVEN",
          "COMMUNITIES UNITED",
          "CITIES REIMAGINED",
        ];

        const sorted = [...action.payload].sort((a, b) => {
          const titleA = (a?.title?.rendered || "").trim().toUpperCase();

          const titleB = (b?.title?.rendered || "").trim().toUpperCase();

          const idxA = customOrder.indexOf(titleA);
          const idxB = customOrder.indexOf(titleB);

          return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
        });

        state.posts = sorted;
      })

      .addCase(fetchAllPhilosophyPosts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load philosophy section data";
      });
  },
});

export const selectAllPhilosophyPosts = (state) => state.philosophyAll.posts;

export const selectAllPhilosophyLoading = (state) => state.philosophyAll.loading;

export default philosophyAllSlice.reducer;
