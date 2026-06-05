import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPhilosophyPosts = createAsyncThunk("philosophy/fetchPosts", async ({ page = 1 }, { getState }) => {
  const lang = getState().language?.currentLanguage || "en";

  const wpLang = lang === "ch" ? "zh-hans" : "en";

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/philosophy?lang=${wpLang}&page=${page}&per_page=8`);

  const total = res.headers.get("X-WP-Total");
  const data = await res.json();

  return {
    data,
    total: Number(total) || 0,
    lang,
  };
});

const philosophySlice = createSlice({
  name: "philosophy",

  initialState: {
    posts: [],
    total: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPhilosophyPosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPhilosophyPosts.fulfilled, (state, action) => {
        state.loading = false;

        const customOrder =
          action.payload.lang === "ch"
            ? ["铸就愿景", "生活故事", "传承织造", "社区联合", "城市新构想"]
            : ["VISION FORGED", "LIVING NARRATIVES", "HERITAGE WOVEN", "COMMUNITIES UNITED", "CITIES REIMAGINED"];

        const sorted = [...action.payload.data].sort((a, b) => {
          const titleA = (a?.title?.rendered || "").trim();
          const titleB = (b?.title?.rendered || "").trim();

          const idxA = customOrder.indexOf(titleA);
          const idxB = customOrder.indexOf(titleB);

          return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
        });

        state.posts = sorted;
        state.total = action.payload.total;
      })

      .addCase(fetchPhilosophyPosts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  },
});

export const selectPhilosophyPosts = (state) => state.philosophy.posts;
export const selectPhilosophyLoading = (state) => state.philosophy.loading;
export const selectPhilosophyTotal = (state) => state.philosophy.total;

export default philosophySlice.reducer;
