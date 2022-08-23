import { createSlice } from "@reduxjs/toolkit";

const local: string | null = localStorage.getItem("darkMode");
let localParse: boolean = false;

if (local === "true" || local === "false") {
  localParse = JSON.parse(local);
}

const initialState = {
  dark: localParse,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    changeMode(state) {
      state.dark = !state.dark;
    },
  },
});

export const { changeMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
