import {API_ENDPOINTS, fetchApi} from "./api"
import type {ICard} from "../types"

export async function getAllCards(): Promise<ICard[]> {
    return fetchApi<ICard[]>(API_ENDPOINTS.cards)
}

export function formatViewCount(count: number): string {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
}
