import { useState, useEffect } from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        const fetchData = async () => {
            setPending(true)
            try {
                const response = await fetch(url, {status: controller.status})
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                const json = await response.json()
                setData(json)
                setPending(false)
                setError(null)
            } catch (error) {
                setError("Something went wrong, please try again.")
                setPending(false)
            }
        }
        fetchData()

        return () => {
            controller.abort()
        }
    }, [url])

    return { data, pending, error }
}