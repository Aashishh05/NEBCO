import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as projectApi from "../../api/projects.api.js";

const message = (err, fallback) => err.response?.data?.message || fallback;

// arg = { admin: true } for admin list, or { params: { page, search, ... } } for public
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (arg = {}, { rejectWithValue }) => {
    try {
      const payload = arg.admin
        ? await projectApi.getAdminProjects()
        : await projectApi.getProjects(arg.params);
      return payload.data;
    } catch (err) {
      return rejectWithValue(message(err, "Failed to load projects"));
    }
  },
);

const initialState = {
  items: [],
  meta: null,
  filters: { category: "", search: "", page: 1 },
  status: "idle",
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetProjectFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "ready";
        const data = action.payload || {};
        state.items = data.items || data.projects || [];
        state.meta = data.total != null
          ? { total: data.total, page: data.page, limit: data.limit }
          : null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "ready";
        state.error = action.payload;
      });
  },
});

export const { setProjectFilters, resetProjectFilters } = projectSlice.actions;
export default projectSlice.reducer;
