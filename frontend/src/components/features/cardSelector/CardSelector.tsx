import type React from "react"
import {useState, useEffect} from "react"
import {X, Check, Eye, Loader} from "lucide-react"
import {
    SelectorOverlay,
    SelectorContainer,
    SelectorHeader,
    SelectorTitle,
    CloseButton,
    SelectorContent,
    CardGrid,
    CardItem,
    CardImage,
    CardContent,
    CardName,
    CardDescription,
    CardViews,
    SelectionCheckmark,
    SelectorFooter,
    CancelButton,
    AddButton,
    LoadingContainer,
    EmptyStateMessage,
    SearchContainer,
    SearchInput,
    SelectAllButton,
} from "./CardSelector.styles"
import type {CardSelectorProps} from "./CardSelector.interface"
import type {ICard} from "../../../types"

const CardSelector: React.FC<CardSelectorProps> = ({isOpen, onClose, onAddCards, sectionId, sectionName}) => {
    const [cards, setCards] = useState<ICard[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedCardIds, setSelectedCardIds] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        if (isOpen) {
            fetchCards()
        }
    }, [isOpen])

    const fetchCards = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch("http://localhost:4000/api/cards")
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }
            const data = await response.json()
            setCards(data)
        } catch (err) {
            console.error("Error fetching cards:", err)
            setError(err instanceof Error ? err.message : "Failed to fetch cards")
        } finally {
            setLoading(false)
        }
    }

    const toggleCardSelection = (cardId: string) => {
        setSelectedCardIds((prev) => {
            if (prev.includes(cardId)) {
                return prev.filter((id) => id !== cardId)
            } else {
                return [...prev, cardId]
            }
        })
    }

    const handleAddCards = () => {
        if (selectedCardIds.length > 0) {
            onAddCards(sectionId, selectedCardIds)
            onClose()
        }
    }

    const filteredCards = searchQuery
        ? cards.filter(
            (card) =>
                card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (card.description && card.description.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        : cards

    const handleSelectAll = () => {
        if (filteredCards.length === 0) return
        const allSelected = filteredCards.every((card) => selectedCardIds.includes(card._id))
        if (allSelected) {
            setSelectedCardIds((prev) => prev.filter((id) => !filteredCards.some((card) => card._id === id)))
        } else {
            const filteredCardIds = filteredCards.map((card) => card._id)
            setSelectedCardIds((prev) => {
                const newSelection = [...prev]
                filteredCardIds.forEach((id) => {
                    if (!newSelection.includes(id)) {
                        newSelection.push(id)
                    }
                })
                return newSelection
            })
        }
    }

    if (!isOpen) return null

    return (
        <SelectorOverlay onClick={onClose}>
            <SelectorContainer onClick={(e) => e.stopPropagation()}>
                <SelectorHeader>
                    <SelectorTitle>Add Cards to "{sectionName}"</SelectorTitle>
                    <CloseButton onClick={onClose}>
                        <X size={20}/>
                    </CloseButton>
                </SelectorHeader>
                <SelectorContent>
                    <SearchContainer>
                        <div className="search-row">
                            <SearchInput
                                type="text"
                                placeholder="Search cards..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <SelectAllButton onClick={handleSelectAll} disabled={filteredCards.length === 0}>
                                {filteredCards.length > 0 && filteredCards.every((card) => selectedCardIds.includes(card._id))
                                    ? "Deselect All"
                                    : "Select All"}
                            </SelectAllButton>
                        </div>
                    </SearchContainer>
                    {loading ? (
                        <LoadingContainer>
                            <Loader size={40} className="animate-spin"/>
                            <p>Loading cards...</p>
                        </LoadingContainer>
                    ) : error ? (
                        <EmptyStateMessage>
                            <h3>Error</h3>
                            <p>{error}</p>
                        </EmptyStateMessage>
                    ) : filteredCards.length === 0 ? (
                        <EmptyStateMessage>
                            <h3>No cards found</h3>
                            <p>{searchQuery ? "Try a different search term" : "Add some cards to get started"}</p>
                        </EmptyStateMessage>
                    ) : (
                        <CardGrid>
                            {filteredCards.map((card) => (
                                <CardItem
                                    key={card._id}
                                    $isSelected={selectedCardIds.includes(card._id)}
                                    onClick={() => toggleCardSelection(card._id)}>
                                    <CardImage
                                        src={card.imageUrl || "/placeholder.svg?height=120&width=200&query=card image"}
                                        alt={card.name}
                                    />
                                    <SelectionCheckmark $isSelected={selectedCardIds.includes(card._id)}>
                                        {selectedCardIds.includes(card._id) && <Check size={16}/>}
                                    </SelectionCheckmark>
                                    <CardContent>
                                        <CardName>{card.name}</CardName>
                                        {card.description && <CardDescription>{card.description}</CardDescription>}
                                        <CardViews>
                                            <Eye size={14}/>
                                            <span>{card.viewsCount.toLocaleString()}</span>
                                        </CardViews>
                                    </CardContent>
                                </CardItem>
                            ))}
                        </CardGrid>
                    )}
                </SelectorContent>
                <SelectorFooter>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <AddButton onClick={handleAddCards} disabled={selectedCardIds.length === 0}>
                        Add {selectedCardIds.length > 0 ? `(${selectedCardIds.length})` : ""}
                    </AddButton>
                </SelectorFooter>
            </SelectorContainer>
        </SelectorOverlay>
    )
}

export default CardSelector
