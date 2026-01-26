import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchtimelinePosts = createAsyncThunk("timeline/fetchPosts", async ({ page = 1 }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/timeline?page=${page}&per_page=8`);

  const total = res.headers.get("X-WP-Total");
  const data = await res.json();

  return {
    data,
    total: Number(total) || 0,
    page
  };
});

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    posts: [],
    total: 0,
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchtimelinePosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchtimelinePosts.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.page > 1) {
          state.posts = [...state.posts, ...action.payload.data];
        } else {
          state.posts = action.payload.data;
        }

        state.total = action.payload.total;
      })
      .addCase(fetchtimelinePosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selecttimelinePosts = state => state.timeline.posts;
export const selecttimelineLoading = state => state.timeline.loading;
export const selecttimelineTotal = state => state.timeline.total;

export default timelineSlice.reducer;
