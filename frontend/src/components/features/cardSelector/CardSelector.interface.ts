export interface CardSelectorProps {
    isOpen: boolean
    onClose: () => void
    onAddCards: (sectionId: string, cardIds: string[]) => void
    sectionId: string
    sectionName: string
}
