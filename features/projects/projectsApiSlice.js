import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "@/app/api/apiSlice"

const projectsAdapter = createEntityAdapter({})

const initialState = projectsAdapter.getInitialState()

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/api/projects",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedProjects = responseData?.projects.map((project) => {
          project.id = project._id
          return project
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
      query: (initialProjectData) => ({
        url: "/api/projects",
        method: "POST",
        body: {
          ...initialProjectData,
        },
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    updateProject: builder.mutation({
      query: (initialProjectData) => {
        return {
          url: "/api/projects",
          method: "PATCH",
          body: {
            ...initialProjectData,
          },
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
      ],
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `/api/projects`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetProjectsQuery,
  useAddNewProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApiSlice

export const selectProjectsResult =
  projectsApiSlice.endpoints.getProjects.select()

// creates memoized selector
const selectProjectsData = createSelector(
  selectProjectsResult,
  (projectsResult) => {
    return projectsResult.data
  }
)

export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
  selectIds: selectProjectIds,
} = projectsAdapter.getSelectors(
  (state) => selectProjectsData(state) ?? initialState
)
