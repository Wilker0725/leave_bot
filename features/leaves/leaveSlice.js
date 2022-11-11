import { createSlice } from "@reduxjs/toolkit";

const LEAVES_QUERY = `page=1&limit=10`;

let initialState = {
  query:
    typeof window === "undefined"
      ? LEAVES_QUERY
      : JSON.parse(window.sessionStorage.getItem("leave-query")),
};

if (initialState.query === null) {
  initialState.query = LEAVES_QUERY;
}

const leavesReducer = createSlice({
  name: "leave",
  initialState: {
    ...initialState,
    page: 0,
    limit: 10,
    search: "",
    isSearch: false,
  },
  reducers: {
    setLeavePageQuery: (state, action) => {
      const query = action.payload;
      state.query = query;
    },
    setLeavePage: (state, action) => {
      state.page = action.payload;
    },
    setLeavePageLimit: (state, action) => {
      console.log("action.payload limit: ", action.payload);

      state.limit = action.payload;
    },
    setLeaveSearch: (state, action) => {
      state.search = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    resetQuery: (state, action) => {
      state.query = "page=1&limit=10";
      state.search = "";
      state.page = 0;
      state.isSearch = false;
    },
  },
});

export const {
  setLeavePageQuery,
  setLeaveSearch,
  resetQuery,
  setLeavePage,
  setLeavePageLimit,
  setIsSearch,
} = leavesReducer.actions;

export default leavesReducer.reducer;

export const selectLeaveQuery = (state) => state.leave.query;
export const selectLeaveSearch = (state) => state.leave.search;
export const selectLeavePage = (state) => state.leave.page;
export const selectLeaveLimit = (state) => state.leave.limit;
export const selectLeaveIsSearch = (state) => state.leave.isSearch;
