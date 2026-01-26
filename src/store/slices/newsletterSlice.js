import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitNewsletter = createAsyncThunk("newsletter/submit", async (values, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append("email-261", values.email);

    formData.append("_wpcf7_unit_tag", "wpcf7-f552-p0-o1");

    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_BASE}/contact-form-7/v1/contact-forms/552/feedback`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.status !== "mail_sent") {
      return rejectWithValue(data.message || "Subscription failed");
    }

    return data;
  } catch (error) {
    return rejectWithValue("Something went wrong");
  }
});

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    loading: false,
    success: false,
    error: null
  },
  reducers: {
    resetNewsletter(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(submitNewsletter.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitNewsletter.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetNewsletter } = newsletterSlice.actions;
export default newsletterSlice.reducer;
