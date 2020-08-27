import { useState } from 'react'

export function useSessionStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.sessionStorage.getItem(key)
            return item ? item : initialValue
        }
        catch (error) {
            console.log(error)
            return initialValue
        }
    })

    const setValue = value => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.sessionStorage.setItem(key, valueToStore)

        } catch (error) {
            console.log(error)
        }
    }

    return [storedValue, setValue]
}

