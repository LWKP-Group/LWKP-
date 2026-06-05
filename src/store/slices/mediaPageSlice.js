import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchmediaPagePosts = createAsyncThunk("mediaPage/fetchPosts", async (_, { getState }) => {
  const lang = getState().language?.currentLanguage || "en";

  const wpLang = lang === "ch" ? "zh-hans" : "en";

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/media_page?lang=${wpLang}&per_page=1`);

  const data = await res.json();

  return data;
});

const mediaPageSlice = createSlice({
  name: "mediaPage",

  initialState: {
    posts: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchmediaPagePosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchmediaPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(fetchmediaPagePosts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  },
});

export const selectmediaPagePosts = (state) => state.mediaPage.posts;
export const selectmediaPageLoading = (state) => state.mediaPage.loading;

export default mediaPageSlice.reducer;
