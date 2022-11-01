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
    const { ids, entities } = users

    content = (
      <CustomizedTables
        minWidth={600}
        headers={["Name", "Role", "Active", "Team Name"]}
        setPage={setPage}
        page={page}
        rowsPerPage={limit}
        setRowsPerPage={setLimit}
        totalPage={267}
      >
        {ids?.length
          ? ids.map((id) => <User key={entities[id].id} user={entities[id]} />)
          : null}
      </CustomizedTables>
    )

    return content
  }
  return content
}

export default UsersList
