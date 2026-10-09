import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeModal: null,
  sidebarOpen: typeof window !== "undefined" ? window.innerWidth > 960 : true,
  mobileMenuOpen: false,
  error: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openMobileMenu: (state) => {
      state.mobileMenuOpen = true;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
  },
});

export const { openModal, closeModal, toggleSidebar, openMobileMenu, closeMobileMenu } =
  uiSlice.actions;
export default uiSlice.reducer;
