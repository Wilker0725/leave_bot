import { createSlice } from "@reduxjs/toolkit"

const userReducer = createSlice({
  name: "user",
  initialState: {
    query: `page=1&limit=10`,
    page: 0,
    limit: 10,
    search: "",
  },
  reducers: {
    setUserPageQuery: (state, action) => {
      const query = action.payload
      state.query = query
    },
    setUserPage: (state, action) => {
      state.page = action.payload
    },
    setUserPageLimit: (state, action) => {
      console.log("action.payload limit: ", action.payload)

      state.limit = action.payload
    },
    setUserSearch: (state, action) => {
      state.search = action.payload
    },
    resetQuery: (state, action) => {
      state.query = "page=1&limit=10"
      state.search = ""
      state.page = 0
    },
  },
})

export const {
  setUserPageQuery,
  setUserSearch,
  resetQuery,
  setUserPage,
  setUserPageLimit,
} = userReducer.actions

export default userReducer.reducer

export const selectUserQuery = (state) => state.user.query
export const selectUserSearch = (state) => state.user.search
export const selectUserPage = (state) => state.user.page
export const selectUserLimit = (state) => state.user.limit