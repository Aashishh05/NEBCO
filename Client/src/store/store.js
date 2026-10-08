import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import projectReducer from "./slices/projectSlice.js";
import enquiryReducer from "./slices/enquirySlice.js";
import uiReducer from "./slices/uiSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    enquiries: enquiryReducer,
    ui: uiReducer,
  },
});