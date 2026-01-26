import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchtimelinePagePosts = createAsyncThunk("timelinePage/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/timeline_page?per_page=1`);
  const data = await res.json();
  return data;
});

const timelinePageSlice = createSlice({
  name: "timelinePage",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchtimelinePagePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchtimelinePagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchtimelinePagePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selecttimelinePagePosts = state => state.timelinePage.posts;
export const selecttimelinePageLoading = state => state.timelinePage.loading;

export default timelinePageSlice.reducer;
