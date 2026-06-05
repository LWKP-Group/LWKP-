import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchpartnershipPagePosts = createAsyncThunk("partnershipPage/fetchPosts", async (_, { getState }) => {
  const lang = getState().language?.currentLanguage || "en";

  const wpLang = lang === "ch" ? "zh-hans" : "en";

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/partnership_page?lang=${wpLang}&per_page=1`);

  const data = await res.json();

  return data;
});

const partnershipPageSlice = createSlice({
  name: "partnershipPage",

  initialState: {
    posts: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchpartnershipPagePosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchpartnershipPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(fetchpartnershipPagePosts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  },
});

export const selectpartnershipPagePosts = (state) => state.partnershipPage.posts;
export const selectpartnershipPageLoading = (state) => state.partnershipPage.loading;

export default partnershipPageSlice.reducer;
