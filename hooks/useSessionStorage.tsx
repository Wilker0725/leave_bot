import { useEffect } from "react"
import { useState } from "react"

const getSessionLocalValue = <T,>(key: string, initValue: T) => {
  if (typeof window === "undefined") return initValue

  // if a value is already store
  const sessionlocalValue = JSON.parse(sessionStorage.getItem(key))
  if (sessionlocalValue) return sessionlocalValue

  // return result of a function
  if (initValue instanceof Function) {
    return initValue()
  }
}

const useSessionStorage = <T,>(key: string, initValue: T) => {
  const [value, setValue] = useState(() => {
    return getSessionLocalValue(key, initValue)
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

/**
  How to use
  const [name, setName] = sessionStorage<string>("name", "valueString")
*/

export default useSessionStorage
