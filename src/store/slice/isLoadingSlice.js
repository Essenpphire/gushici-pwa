import { createSlice } from "@reduxjs/toolkit";

export const isLoadingSlice = createSlice({
  name: "loading",
  initialState: {
    value: true,
  },
  reducers: {
    modifyLoading: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { modifyLoading } = isLoadingSlice.actions;

export const SelectIsLoading = (state) => state.isLoading.value;

export default isLoadingSlice.reducer;