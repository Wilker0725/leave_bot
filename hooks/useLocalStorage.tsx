import { useState } from "react"

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue

    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log("useLocalStore Error: ", error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
    } catch (error) {
      console.log("localStorage setValue Error:", error)
    }
  }

  return [storedValue, setValue] as const
}

/**
  How to use
  const [name, setName] = useLocalStorage<string>("name", "valueString")
*/

export default useLocalStorage
