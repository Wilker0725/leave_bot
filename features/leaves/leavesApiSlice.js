import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "@/app/api/apiSlice";

const leavesAdapter = createEntityAdapter({});

const initialState = leavesAdapter.getInitialState();

let totalPages = 0,
  currentPage = 0,
  recordCount = 0;

export const LeavesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaves: builder.query({
      query: (page = 0) => {
        currentPage = page;
        return `/api/leaves?page=${page + 1}`;
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedLeaves = responseData?.leaves.map((Leave) => {
          Leave.id = Leave._id;
          return Leave;
        });

        return leavesAdapter.setAll(initialState, loadedLeaves);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Leave", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Leave", id })),
          ];
        } else return [{ type: "Leave", id: "LIST" }];
      },
    }),
    addNewLeave: builder.mutation({
      query: (initialLeaveData) => ({
        url: "/api/Leaves",
        method: "POST",
        body: {
          ...initialLeaveData,
        },
      }),
      invalidatesTags: [{ type: "Leave", id: "LIST" }],
    }),
    updateLeave: builder.mutation({
      query: (initialLeaveData) => {
        return {
          url: "/api/Leaves",
          method: "PATCH",
          body: {
            ...initialLeaveData,
          },
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Leave", id: arg.id }],
    }),
    deleteLeave: builder.mutation({
      query: ({ id }) => ({
        url: `/api/leaves`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Leave", id: arg.id }],
    }),
  }),
});

export { currentPage, recordCount, totalPages };

export const {
  useGetLeavesQuery,
  useAddNewLeaveMutation,
  useUpdateLeaveMutation,
  useDeleteLeaveMutation,
} = LeavesApiSlice;

export const selectLeavesResult = LeavesApiSlice.endpoints.getLeaves.select();

// creates memoized selector
const selectLeavesData = createSelector(selectLeavesResult, (LeavesResult) => {
  return LeavesResult.data;
});

export const {
  selectAll: selectAllLeaves,
  selectById: selectLeaveById,
  selectIds: selectLeaveIds,
} = leavesAdapter.getSelectors(
  (state) => selectLeavesData(state) ?? initialState
);
