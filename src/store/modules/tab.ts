import { createSlice } from "@reduxjs/toolkit";
import JSON5 from "json5";
interface TabState {
  loading: boolean;
  tabs: { key: string; label: string }[];
  activeTab: string;
}

const initialState: TabState = {
  loading: false,
  tabs: JSON5.parse(sessionStorage.getItem("tabs") as string) || [],
  activeTab: JSON5.parse(sessionStorage.getItem("activeTab") as string) || "",
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    reload(state, action) {
      state.loading = action.payload;
    },
    setTabs(state, action) {
      state.tabs = action.payload;
    },
    navigate(state, action) {
      const tab = state.tabs.find((item) => item.key === action.payload.key);
      if (!tab) {
        state.tabs.push(action.payload);
        state.activeTab = action.payload.key;
      }else{
        state.activeTab = action.payload.key;
      }
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    }
  },
});

export default tabSlice.reducer;
