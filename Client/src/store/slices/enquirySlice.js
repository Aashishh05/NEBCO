import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as enquiryApi from "../../api/enquiries.api.js";

const message = (err, fallback) => err.response?.data?.message || fallback;

export const fetchEnquiries = createAsyncThunk(
  "enquiries/fetchEnquiries",
  async (params, { rejectWithValue }) => {
    try {
      const payload = await enquiryApi.getEnquiries(params);
      return payload.data;
    } catch (err) {
      return rejectWithValue(message(err, "Failed to load enquiries"));
    }
  },
);

export const updateEnquiry = createAsyncThunk(
  "enquiries/updateEnquiry",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const payload = await enquiryApi.updateEnquiry(id, data);
      return payload.data.enquiry;
    } catch (err) {
      return rejectWithValue(message(err, "Failed to update enquiry"));
    }
  },
);

const initialState = {
  items: [],
  meta: null,
  filters: { status: "", search: "", page: 1 },
  status: "idle",
  error: null,
};

const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {
    setEnquiryFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetEnquiryFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnquiries.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.status = "ready";
        const data = action.payload || {};
        state.items = data.items || [];
        state.meta = { total: data.total, page: data.page, limit: data.limit };
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.status = "ready";
        state.error = action.payload;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export const { setEnquiryFilters, resetEnquiryFilters } = enquirySlice.actions;
export default enquirySlice.reducer;
