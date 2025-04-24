import {useState, useEffect, useCallback} from "react"
import {toast} from "react-toastify"
import * as cardService from "../services/cardService"
import type {ICard} from "../types"

export function useCards() {
    const [cards, setCards] = useState<ICard[]>([])
    const [cardsMap, setCardsMap] = useState<Record<string, ICard>>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchCards = useCallback(async () => {
        setLoading(true)
        try {
            const fetchedCards = await cardService.getAllCards()
            setCards(fetchedCards)

            const cardsRecord: Record<string, ICard> = {}
            fetchedCards.forEach((card) => {
                cardsRecord[card._id] = card
            })
            setCardsMap(cardsRecord)

            return fetchedCards
        } catch (err) {
            const error = err as Error
            setError(error)
            toast.error(`Failed to fetch cards: ${error.message}`)
            return []
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchCards()
    }, [fetchCards])

    return {
        cards,
        cardsMap,
        loading,
        error,
        fetchCards,
        formatViewCount: cardService.formatViewCount,
    }
}
