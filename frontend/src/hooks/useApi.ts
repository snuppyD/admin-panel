import {useState, useCallback, useEffect} from "react"
import {fetchApi} from "../services/api"

type FetchMethod = "GET" | "POST" | "PUT" | "DELETE"

interface FetchOptions<TBody = unknown> {
    method?: FetchMethod
    headers?: HeadersInit
    body?: TBody
    skip?: boolean
    successMessage?: string
    errorMessage?: string
    url?: string
}

export function useApi<TResponse = unknown, TBody = unknown>(initialUrl: string, initialOptions?: FetchOptions<TBody>) {
    const [data, setData] = useState<TResponse | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchData = useCallback(
        async (overrideOptions?: FetchOptions<TBody>): Promise<TResponse | null> => {
            setLoading(true)
            setError(null)
            const options = {...initialOptions, ...overrideOptions}
            const url = options?.url || initialUrl
            try {
                if (!url) {
                    throw new Error("URL is empty. Please provide a valid API endpoint.")
                }
                const result = await fetchApi<TResponse>(url, {
                    method: options?.method || "GET",
                    headers: options?.headers,
                    body: options?.body ? JSON.stringify(options.body) : undefined,
                })
                setData(result)
                return result
            } catch (err) {
                const typedError = err as Error
                setError(typedError)
                return null
            } finally {
                setLoading(false)
            }
        },
        [initialUrl, initialOptions],
    )

    useEffect(() => {
        if (!initialOptions?.skip) {
            fetchData()
        }
    }, [initialUrl])

    return {data, error, loading, refetch: fetchData}
}
