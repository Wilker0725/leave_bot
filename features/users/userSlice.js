import { createSlice } from "@reduxjs/toolkit"

const userReducer = createSlice({
  name: "user",
  initialState: {
    query: `page=1&limit=10`,
  },
  reducers: {
    setUserPageQuery: (state, action) => {
      const query = action.payload
      state.query = query
    },
  },
})

export const { setUserPageQuery } = userReducer.actions

export default userReducer.reducer

export const selectUserQuery = (state) => state.user.query
