import { createSlice } from "@reduxjs/toolkit";

const LEAVES_QUERY = `page=1&limit=10`;

let initialState = {
  query:
    typeof window === "undefined"
      ? LEAVES_QUERY
      : JSON.parse(window.sessionStorage.getItem("leaves-query")),
};

if (initialState.query === null) {
  initialState.query = LEAVES_QUERY;
}

const leavesReducer = createSlice({
  name: "leaves",
  initialState: {
    ...initialState,
    page: 0,
    limit: 10,
    search: "",
  },
  reducers: {
    setleavesPageQuery: (state, action) => {
      const query = action.payload;
      state.query = query;
    },
    setLeavesPage: (state, action) => {
      state.page = action.payload;
    },
    setLeavesPageLimit: (state, action) => {
      console.log("action.payload limit: ", action.payload);

      state.limit = action.payload;
    },
    setLeavesSearch: (state, action) => {
      state.search = action.payload;
    },
    resetQuery: (state, action) => {
      state.query = "page=1&limit=10";
      state.search = "";
      state.page = 0;
    },
  },
});

export const {
  setLeavesPageQuery,
  setLeavesSearch,
  resetQuery,
  setLeavesPage,
  setLeavesPageLimit,
} = leavesReducer.actions;

export default leavesReducer.reducer;

export const selectLeavesQuery = (state) => state.leaves.query;
export const selectLeavesSearch = (state) => state.leaves.search;
export const selectLeavesPage = (state) => state.leaves.page;
export const selectLeavesLimit = (state) => state.leaves.limit;
