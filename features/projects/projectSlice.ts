import { createSlice } from "@reduxjs/toolkit"

type ProjectSliceState = {
  page: number
  limit: number
  search: string
  isSearch: boolean
  query: string
}

const PROJECT_QUERY = `page=1&limit=10`

let initialState = {
  query:
    typeof window === "undefined"
      ? PROJECT_QUERY
      : JSON.parse(window.sessionStorage.getItem("project-query")),
}

if (initialState.query === null) {
  initialState.query = PROJECT_QUERY
}

const ProjectReducer = createSlice({
  name: "project",
  initialState: {
    ...initialState,
    page: 0,
    limit: 10,
    search: "",
    isSearch: false,
  } as ProjectSliceState,
  reducers: {
    setProjectPageQuery: (state, action) => {
      const query = action.payload
      state.query = query 
    },
    setProjectPage: (state, action) => {
      state.page = action.payload
    },
    setProjectPageLimit: (state, action) => {
      state.limit = action.payload
    },
    setProjectSearch: (state, action) => {
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
  setProjectPageQuery,
  setProjectPage,
  setProjectPageLimit,
  setProjectSearch,
  setIsSearch,
  resetQuery,
} = ProjectReducer.actions

export default ProjectReducer.reducer

export const selectProjectQuery = (state: { project: Pick<ProjectSliceState, "query">}) => state.project.query
export const selectProjectSearch = (state: { project: Pick<ProjectSliceState, "search">}) => state.project.search
export const selectProjectPage = (state: { project: Pick<ProjectSliceState, "page">}) => state.project.page
export const selectProjectLimit = (state: { project: Pick<ProjectSliceState, "limit">}) => state.project.limit
export const selectProjectIsSearch = (state: { project: Pick<ProjectSliceState, "isSearch">}) => state.project.isSearch
