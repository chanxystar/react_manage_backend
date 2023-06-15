import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  config: {
    token: {
      colorPrimary: string;
      colorLink: string;
      colorLinkActive: string;
      colorLinkHover: string;
    };
  };
  deepcolor?: string;
}

const initialState: ThemeState = {
  config: {
    token: {
      colorPrimary: localStorage.getItem("color") || "#388991",
      colorLink: localStorage.getItem("color") || "#388991",
      colorLinkActive: localStorage.getItem("color") || "#388991",
      colorLinkHover: localStorage.getItem("color") || "#388991",
    },
  },
  deepcolor: localStorage.getItem("deepcolor") || "#0060A7",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeColor(state, action) {
      state.config.token = {
        colorPrimary: action.payload,
        colorLink: action.payload,
        colorLinkActive: action.payload,
        colorLinkHover: action.payload,
      };
      localStorage.setItem("color", action.payload);
    },
    changeGradient(state, action) {
      state.deepcolor = action.payload;
      localStorage.setItem("deepcolor", action.payload);
    },
  },
});

export default themeSlice.reducer;
