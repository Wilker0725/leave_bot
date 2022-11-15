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
            { type: "Leave", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Leave", id })),
          ];
        } else return [{ type: "Leave", id: "LIST" }];
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetLeavesQuery } = leavesApiSlice;
