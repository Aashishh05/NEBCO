import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../api/auth.api.js";

const message = (err, fallback) => err.response?.data?.message || fallback;

export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const payload = await authApi.me();
    return payload.data;
  } catch (err) {
    return rejectWithValue(message(err, "Not authenticated"));
  }
});

export const login = createAsyncThunk("auth/login", async (credentials, { dispatch, rejectWithValue }) => {
  try {
    await authApi.login(credentials);
    return await dispatch(fetchMe()).unwrap();
  } catch (err) {
    return rejectWithValue(message(err, "Login failed"));
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
});

const initialState = { user: null, permissions: {}, status: "idle", error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "ready";
        state.user = action.payload.user;
        state.permissions = action.payload.permissions || {};
      })
      .addCase(fetchMe.rejected, (state) => {
        state.status = "ready";
        state.user = null;
        state.permissions = {};
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "ready";
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, () => ({ ...initialState, status: "ready" }));
  },
});

export default authSlice.reducer;