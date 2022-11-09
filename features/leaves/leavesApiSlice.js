import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "@/app/api/apiSlice";
import { queryToObject } from "@/utils/queryTransform";

export const leavesAdapter = createEntityAdapter();

export const initialState = leavesAdapter.getInitialState();

export const leavesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaves: builder.query({
      query: (args) => {
        let params = queryToObject(args);

        return {
          url: `/api/leaves`,
          method: "GET",
          params,
        };
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const { currentPage, recordCount, totalPages } = responseData;

        const loadedleaves = responseData?.leaves.map((leaves) => leaves);

        // walk around to pass page details
        loadedleaves.push({
          id: "pageInfo",
          currentPage,
          recordCount,
          totalPages,
        });

        return leavesAdapter.setAll(initialState, loadedleaves);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Leaves", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Leaves", id })),
          ];
        } else return [{ type: "Leaves", id: "LIST" }];
      },
    }),
    // addNewUser: builder.mutation({
    //   query: (data) => ({
    //     url: "/api/users",
    //     method: "POST",
    //     body: {
    //       ...data,
    //     },
    //   }),
    //   invalidatesTags: [{ type: "User", id: "LIST" }],
    // }),
    // updateUser: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: `/api/users/${data.id}`,
    //       method: "PUT",
    //       body: {
    //         ...data,
    //       },
    //     }
    //   },
    //   invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    // }),
    // deleteUser: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/api/users/${id}`,
    //     method: "DELETE",
    //     body: { id },
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    // }),
  }),
  overrideExisting: true,
});

export const {
  useGetLeavesQuery,
  // useAddNewLeaveMutation,
  // useUpdateLeaveMutation,
  // useDeleteLeaMutation,
} = leavesApiSlice;

// export const getUserSelectors = (query) => {
//   const selectUsersResult = usersApiSlice.endpoints.getUsers.select(query)

//   const adapterSelectors = createSelector(selectUsersResult, (result) =>
//     usersAdapter.getSelectors(() => result?.data ?? initialState)
//   )

//   return {
//     selectAll: createSelector(adapterSelectors, (s) => s.selectAll(undefined)),
//     selectEntities: createSelector(adapterSelectors, (s) =>
//       s.selectEntities(undefined)
//     ),
//     selectIds: createSelector(adapterSelectors, (s) => s.selectIds(undefined)),
//     selectTotal: createSelector(adapterSelectors, (s) =>
//       s.selectTotal(undefined)
//     ),
//     selectById: (id) =>
//       createSelector(adapterSelectors, (s) => s.selectById(s, id)),
//   }
// }
