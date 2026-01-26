import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitContactForm = createAsyncThunk("contactForm/submit", async (values, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append("text-244", values.name);
    formData.append("email-27", values.email);
    formData.append("textarea-209", values.message);

    formData.append("_wpcf7_unit_tag", "wpcf7-f6-p0-o1");

    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_BASE}/contact-form-7/v1/contact-forms/6/feedback`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.status !== "mail_sent") {
      return rejectWithValue(data.message || "Form submission failed");
    }

    return data;
  } catch (error) {
    return rejectWithValue("Something went wrong");
  }
});

const contactFormSlice = createSlice({
  name: "contactForm",
  initialState: {
    loading: false,
    success: false,
    error: null
  },
  reducers: {
    resetContactForm(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(submitContactForm.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitContactForm.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetContactForm } = contactFormSlice.actions;
export default contactFormSlice.reducer;
