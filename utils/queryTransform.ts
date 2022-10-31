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
  const queryString = new URLSearchParams(args).toString()

  return queryString
}
