import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  isSidebarOpen: boolean;
}

const initialState: UiState = {
  isSidebarOpen: true,
};

export const uiReducer = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleSidebar } = uiReducer.actions;
export default uiReducer.reducer;
