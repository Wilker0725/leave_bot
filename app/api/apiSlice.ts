import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json")
    return headers
  },
})

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
})
