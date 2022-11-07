export const queryToObject = (args: string) => {
  const params = args.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=")
    if (acc[key] == null) {
      acc[key] = value
    }

    return acc
  }, {})

  return params
}

export const objectToQuery = (args) => {
  /**
    sort_by is a query string eg:&sort_by=team_name&direction=desc 
    instead of sort_by: "team_name", direction: "desc"
  */
  const { sort_by, ...rest} = args;
  
  let queryString = new URLSearchParams(rest).toString().replace(/\+/g, " ");
  
  queryString = `${queryString}${sort_by ? sort_by : ""}`;

  return queryString
}
