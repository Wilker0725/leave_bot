import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "@/app/api/apiSlice"
import { queryToObject } from "@/utils/queryTransform"

export const usersAdapter = createEntityAdapter()

export const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (args) => {
        let params = queryToObject(args)

        return {
          url: `/api/users`,
          method: "GET",
          params,
        }
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const { currentPage, recordCount, totalPages } = responseData

        const loadedUsers = responseData?.users.map((user) => user)

        // walk around to pass page details
        loadedUsers.push({
          id: "pageInfo",
          currentPage,
          recordCount,
          totalPages,
        })

        return usersAdapter.setAll(initialState, loadedUsers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ]
        } else return [{ type: "User", id: "LIST" }]
      },
    }),
    addNewUser: builder.mutation({
      query: (data) => ({
        url: "/api/users",
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: `/api/users/${data.id}`,
          method: "PUT",
          body: {
            ...data,
          },
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice

export const getUserSelectors = (query) => {
  const selectUsersResult = usersApiSlice.endpoints.getUsers.select(query)

  const adapterSelectors = createSelector(selectUsersResult, (result) =>
    usersAdapter.getSelectors(() => result?.data ?? initialState)
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
