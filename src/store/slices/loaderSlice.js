import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    finishLoading(state) {
      state.loading = false;
    }
  }
});

export const { finishLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
