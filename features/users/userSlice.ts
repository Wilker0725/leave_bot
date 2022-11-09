import { createSlice } from "@reduxjs/toolkit"

type UserSliceState = {
  page: number
  limit: number
  search: string
  isSearch: boolean
  query: string
}

const USER_QUERY = `page=1&limit=10`

let initialState = {
  query:
    typeof window === "undefined"
      ? USER_QUERY
      : JSON.parse(window.sessionStorage.getItem("user-query")),
}

if (initialState.query === null) {
  initialState.query = USER_QUERY
}

const userReducer = createSlice({
  name: "user",
  initialState: {
    ...initialState,
    page: 0,
    limit: 10,
    search: "",
    isSearch: false,
  } as UserSliceState,
  reducers: {
    setUserPageQuery: (state, action) => {
      const query = action.payload
      state.query = query 
    },
    setUserPage: (state, action) => {
      state.page = action.payload
    },
    setUserPageLimit: (state, action) => {
      state.limit = action.payload
    },
    setUserSearch: (state, action) => {
      state.search = action.payload
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload
    },
    resetQuery: (state, action) => {
      state.query = "page=1&limit=10"
      state.search = ""
      state.page = 0
      state.isSearch = false
    },
  },
})

export const {
  setUserPageQuery,
  setUserPage,
  setUserPageLimit,
  setUserSearch,
  setIsSearch,
  resetQuery,
} = userReducer.actions

export default userReducer.reducer

export const selectUserQuery = (state: { user: Pick<UserSliceState, "query">}) => state.user.query
export const selectUserSearch = (state: { user: Pick<UserSliceState, "search">}) => state.user.search
export const selectUserPage = (state: { user: Pick<UserSliceState, "page">}) => state.user.page
export const selectUserLimit = (state: { user: Pick<UserSliceState, "limit">}) => state.user.limit
export const selectUserIsSearch = (state: { user: Pick<UserSliceState, "isSearch">}) => state.user.isSearch
