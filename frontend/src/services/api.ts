const API_BASE_URL = "http://localhost:4000/api"

export const API_ENDPOINTS = {
    configurations: `${API_BASE_URL}/configuration`,
    activeConfiguration: `${API_BASE_URL}/activeConfiguration`,
    active: `${API_BASE_URL}/active`,
    updateConfiguration: (id: string) => `${API_BASE_URL}/configuration/${id}`,
    deleteConfiguration: (id: string) => `${API_BASE_URL}/configuration/${id}`,
    setActiveConfiguration: (id: string) => `${API_BASE_URL}/activeConfiguration/${id}`,
    cards: `${API_BASE_URL}/cards`,
}

export class ApiError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
        this.name = "ApiError"
    }
}

export async function fetchApi<T>(url: string, options: RequestInit = {}): Promise<T> {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        })

        if (!response.ok) {
            const contentType = response.headers.get("content-type")
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json()
                throw new ApiError(
                    `Error ${response.status}: ${response.statusText}${
                        errorData.error || errorData.message ? ` - ${errorData.error || errorData.message}` : ""
                    }`,
                    response.status,
                )
            } else {
                throw new ApiError(`Error ${response.status}: ${response.statusText}`, response.status)
            }
        }

        const data = await response.json()
        return data as T
    } catch (error) {
        if (error instanceof ApiError) {
            throw error
        }
        throw new Error(`Network error: ${(error as Error).message}`)
    }
}
