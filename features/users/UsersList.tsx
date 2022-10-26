import CustomizedTables from "@/components/Tables/CustomizedTable"
import User from "@/features/users/User"
import { useGetUsersQuery } from "@/features/users/usersApiSlice"
import { useState } from "react"

const UsersList = () => {
  const [page, setPage] = useState(0)

  const { data: users, isLoading, isSuccess, isError } = useGetUsersQuery(page)

  let content = null

  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <p>Error</p>

  if (isSuccess) {
    const { ids } = users
    const tableContent = ids?.length
      ? ids.map((id: string) => <User key={id} id={id} />)
      : null

    content = (
      <CustomizedTables
        minWidth={600}
        headers={["Name", "Role", "Active", "Project Team Id"]}
        ids={ids}
        page={page}
        totalPage={1} // for real data
        setPage={setPage}
      >
        {tableContent}
      </CustomizedTables>
    )

    return content
  }
  return content
}

export default UsersList
