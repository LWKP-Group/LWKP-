import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchcontactusPosts = createAsyncThunk("contactus/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/contact_us?per_page=1`);
  const data = await res.json();
  return data;
});

const contactusSlice = createSlice({
  name: "contactus",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchcontactusPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchcontactusPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchcontactusPosts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  }
});

export const selectcontactusPosts = state => state.contactus.posts;
export const selectcontactusLoading = state => state.contactus.loading;

export default contactusSlice.reducer;
