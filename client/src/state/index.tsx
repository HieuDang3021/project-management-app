import { createSlice, PayloadAction }from "@reduxjs/toolkit";

export interface initialStateTypes {
  isSideBarOpen: boolean;
  isDarkMode: boolean;
}

const initialState: initialStateTypes = {
  isSideBarOpen: true,
  isDarkMode: false,
}; 

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSideBarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSideBarOpen = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsSideBarOpen, setIsDarkMode} = globalSlice.actions;
export default globalSlice.reducer;