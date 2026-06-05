import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchaboutusPosts = createAsyncThunk("aboutus/fetchPosts", async (_, { getState }) => {
  const lang = getState().language?.currentLanguage || "en";

  const wpLang = lang === "ch" ? "zh-hans" : "en";

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/about_us?lang=${wpLang}&per_page=1`);

  const data = await res.json();

  return data;
});

const aboutusSlice = createSlice({
  name: "aboutus",

  initialState: {
    posts: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchaboutusPosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchaboutusPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(fetchaboutusPosts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  },
});

export const selectaboutusPosts = (state) => state.aboutus.posts;
export const selectaboutusLoading = (state) => state.aboutus.loading;

export default aboutusSlice.reducer;
