import { store } from "@/app/store"
import React, { FC, useEffect } from "react"
import { useSelector } from "react-redux"
import { projectsApiSlice } from "../projects/projectsApiSlice"
import { getUserSelectors, usersApiSlice } from "../users/usersApiSlice"
import { selectUserQuery } from "../users/userSlice"

export type AppDispatch = typeof store.dispatch

type PropsPrefetch = {
  children?: React.ReactNode
}

const Prefetch: FC<PropsPrefetch> = ({ children }) => {
  const queryUser = useSelector(selectUserQuery)

  useEffect(() => {
    const projects = store.dispatch(
      projectsApiSlice.endpoints.getProjects.initiate(undefined)
    )
    // const users = store.dispatch(
    //   usersApiSlice.endpoints.getUsers.initiate(undefined)
    // )

    return () => {
      projects.unsubscribe()
      // users.unsubscribe()
    }
  }, [])
  return <>{children}</>
}

export default Prefetch
