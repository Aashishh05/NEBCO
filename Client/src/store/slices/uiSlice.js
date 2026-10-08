import { createSlice } from "@reduxjs/toolkit";

// Which modal is open (enquiry / appointment), opened from any page button.
const initialState = { activeModal: null, error: null };

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
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;