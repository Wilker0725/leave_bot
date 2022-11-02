import { useEffect } from "react"
import { useState } from "react"

const getLocalValue = <T,>(key: string, initValue: T) => {
  if (typeof window === "undefined") return initValue

  // if a value is already store
  const localValue = JSON.parse(localStorage.getItem(key))
  if (localValue) return localValue

  // return result of a function
  if (initValue instanceof Function) {
    return initValue()
  }
}

const useLocalStorage = <T,>(key: string, initValue: T) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

/**
  How to use
  const [name, setName] = useLocalStorage<string>("name", "valueString")
*/

export default useLocalStorage
