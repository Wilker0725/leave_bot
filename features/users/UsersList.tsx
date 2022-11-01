import { useAppDispatch } from "@/app/store"
import CustomizedTables from "@/components/Tables/CustomizedTable"
import User from "@/features/users/User"
import { useGetUsersQuery } from "@/features/users/usersApiSlice"
import { useEffect, useState } from "react"
import { selectUserQuery, setUserPageQuery } from "@/features/users/userSlice"
import { useSelector } from "react-redux"
import { queryToObject } from "@/utils/queryTransform"

const UsersList = () => {
  const dispatch = useAppDispatch()
  const pageSearchQuery = useSelector(selectUserQuery)

  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
  } = useGetUsersQuery(pageSearchQuery)

  useEffect(() => {
    const queryString = `page=${page + 1}&limit=${limit}`

    dispatch(setUserPageQuery(queryString))
  }, [page, limit, dispatch])

  let content = null

  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <p>Error</p>

  if (isSuccess) {
    let { ids, entities } = users

    /**
        Walk around from apiSlice to pass pageInfo 
        Need to remove from here 
        - to remove the last item
     */
    const pageInfo = entities["pageInfo"]

    content = (
      <CustomizedTables
        minWidth={600}
        headers={["Name", "Cognizant Id", "Role", "Team Name"]}
        setPage={setPage}
        page={page}
        rowsPerPage={limit}
        setRowsPerPage={setLimit}
        totalPage={pageInfo.recordCount}
      >
        {ids?.length
          ? ids.map((id: string) => {
              if (id === "pageInfo") return null

              return <User key={entities[id].id} user={entities[id]} />
            })
          : null}
      </CustomizedTables>
    )

    return content
  }
  return content
}

export default UsersList
