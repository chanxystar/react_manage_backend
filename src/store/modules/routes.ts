import { RoutesList } from "@/router/index.d";
import { createSlice } from "@reduxjs/toolkit";

interface RoutesState {
  list: RoutesList[];
  loading: boolean;
}

const initialState: RoutesState = {
  list: [],
  loading:true
};

const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setList(state, action) {
      state.list = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  },
});

export default routesSlice.reducer;
