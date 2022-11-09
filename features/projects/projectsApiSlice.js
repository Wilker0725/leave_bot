import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "@/app/api/apiSlice"
import { queryToObject } from "@/utils/queryTransform"

export const projectsAdapter = createEntityAdapter()

export const initialState = projectsAdapter.getInitialState()

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (args) => {
        let params = queryToObject(args)

        return {
          url: `/api/projects`,
          method: "GET",
          params,
        }
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const { currentPage, recordCount, totalPages } = responseData

        const loadedProjects = responseData?.resources.map((project) => project)

        loadedProjects.push({
          id: "pageInfo",
          currentPage,
          recordCount,
          totalPages,
        })

        return projectsAdapter.setAll(initialState, loadedProjects)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Project", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Project", id })),
          ]
        } else return [{ type: "Project", id: "LIST" }]
      },
    }),
    addNewProject: builder.mutation({
      query: (data) => {
        return {
          url: "/api/projects",
          method: "POST",
          body: {
            ...data,
          },
        }
      },
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    updateProject: builder.mutation({
      query: (data) => {
        return {
          url: `/api/projects/${data.id}`,
          method: "PUT",
          body: {
            ...data,
          },
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Project", id: arg.id }],
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `/api/projects/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Project", id: arg.id }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetProjectsQuery,
  useAddNewProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApiSlice

export const getProjectSelectors = (query) => {
  const selectProjectsResult = projectsApiSlice.endpoints.getProjects.select(query)

  const adapterSelectors = createSelector(selectProjectsResult, (result) =>
    projectsAdapter.getSelectors(() => result?.data ?? initialState)
  )

  return {
    selectAll: createSelector(adapterSelectors, (s) => s.selectAll(undefined)),
    selectEntities: createSelector(adapterSelectors, (s) =>
      s.selectEntities(undefined)
    ),
    selectIds: createSelector(adapterSelectors, (s) => s.selectIds(undefined)),
    selectTotal: createSelector(adapterSelectors, (s) =>
      s.selectTotal(undefined)
    ),
    selectById: (id) =>
      createSelector(adapterSelectors, (s) => s.selectById(s, id)),
  }
}
