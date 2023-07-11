import { createSlice } from "@reduxjs/toolkit";
import JSON5 from "json5";

interface Tab {
  key: string;
  label: string;
  isMenu: boolean;
}
interface TabState {
  loading: boolean;
  tabs: Tab[];
  activeKey: string;
}

const initialState: TabState = {
  loading: false,
  tabs: JSON5.parse(sessionStorage.getItem("tabs") as string) || [],
  activeKey: JSON5.parse(sessionStorage.getItem("activeKey") as string) || ''
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
    navigate(
      state,
      action: {
        payload: { key: string; label: string; isMenu: boolean };
      }
    ) {
      const { key, label, isMenu } = action.payload;
      const tab = state.tabs.find((item) => item.key === key);
      if (tab) {
        state.activeKey = key;
      } else {
        state.tabs.push({ key, label, isMenu });
        state.activeKey = isMenu ? key : "";
      }
    },
    setActiveKey(
      state,
      action: {
        payload: string;
      }
    ) {
      state.activeKey = action.payload;
    },
  },
});

export default tabSlice.reducer;
