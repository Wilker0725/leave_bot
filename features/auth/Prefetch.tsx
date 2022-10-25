import { store } from "@/app/store"
import React, { FC, useEffect } from "react"
import { projectsApiSlice } from "../projects/projectsApiSlice"

export type AppDispatch = typeof store.dispatch

type PropsPrefetch = {
  children?: React.ReactNode
}

const Prefetch: FC<PropsPrefetch> = ({ children }) => {
  // prevent state gone after refresh
  useEffect(() => {
    const projects = store.dispatch(
      projectsApiSlice.endpoints.getProjects.initiate(undefined)
    )

    return () => {
      projects.unsubscribe()
    }
  }, [])
  return <>{children}</>
}

export default Prefetch
