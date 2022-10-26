import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "@/app/api/apiSlice"

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

let totalPages = 0,
  currentPage = 0,
  recordCount = 0

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page = 0) => {
        currentPage = page
        return `/api/users?page=${page + 1}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        recordCount = responseData.recordCount
        totalPages = responseData.totalPages

        const loadedUsers = responseData?.users.map((user) => {
          user.id = user.id
          return user
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
      query: (initialUserData) => ({
        url: "/api/users",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => {
        return {
          url: "/api/users",
          method: "PATCH",
          body: {
            ...initialUserData,
          },
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/users`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
})

export { currentPage, recordCount, totalPages }

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice

export const selectUsersResult =
  usersApiSlice.endpoints.getUsers.select(currentPage)

// creates memoized selector
const selectUsersData = createSelector(selectUsersResult, (usersResult) => {
  return usersResult.data
})

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)
