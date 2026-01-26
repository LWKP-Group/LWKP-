import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchpeopleDepart = createAsyncThunk("peopleDepart/fetch", async ({ page = 1 }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/people_departs?page=${page}&per_page=10&_embed`);

  const total = res.headers.get("X-WP-Total");
  const data = await res.json();

  return {
    data: Array.isArray(data) ? data : [],
    total: Number(total) || 0
  };
});

const peopleDepartSlice = createSlice({
  name: "peopleDepart",
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchpeopleDepart.pending, state => {
        state.loading = true;
      })
      .addCase(fetchpeopleDepart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchpeopleDepart.rejected, state => {
        state.loading = false;
        state.items = [];
        state.error = "Failed to load data";
      });
  }
});

export const selectpeopleDepart = state => state.peopleDepart.items;
export const selectpeopleDepartLoading = state => state.peopleDepart.loading;
export const selectpeopleDepartTotal = state => state.peopleDepart.total;

export default peopleDepartSlice.reducer;
