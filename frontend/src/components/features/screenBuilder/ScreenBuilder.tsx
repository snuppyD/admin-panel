import type React from "react"
import {useState, useEffect} from "react"
import {Droppable, Draggable} from "@hello-pangea/dnd"
import {Trash2, Plus, GripVertical, Loader, PlusCircle, Edit} from "lucide-react"
import {
    ScreenContainer,
    SectionWrapper,
    SectionHeader,
    SectionTitle,
    SectionType,
    SectionOption,
    DeleteSectionButton,
    SectionDragHandle,
    SectionContent,
    AddSectionContainer,
    AddSectionButton,
    AddSectionForm,
    FormRow,
    FormLabel,
    FormInput,
    FormSelect,
    FormButton,
    LoadingContainer,
    EmptyStateContainer,
    AddCardsButton,
    EditSectionButton,
} from "./ScreenBuilder.styles"
import type {ScreenBuilderProps} from "./ScreenBuilder.interface"
import type {IConfigurationItem, ICard} from "../../../types"
import ContentBlock from "../contentBlock/ContentBlock"
import CardSelector from "../cardSelector/CardSelector"
import SectionEditor from "../sectionEditor/SectionEditor"

const ScreenBuilder: React.FC<ScreenBuilderProps> = ({
                                                         configItems,
                                                         onAddConfigItem,
                                                         onUpdateConfigItem,
                                                         onDeleteConfigItem,
                                                         onAddCardsToSection,
                                                         isLoading,
                                                         onDeleteCardFromSection,
                                                     }) => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [newSectionName, setNewSectionName] = useState("")
    const [newSectionType, setNewSectionType] = useState<IConfigurationItem["type"]>("slideshow")
    const [newSectionOption, setNewSectionOption] = useState<IConfigurationItem["sortCardsBy"]>("views")
    const [hoveredSectionId, setHoveredSectionId] = useState<string | null>(null)
    const [cardSelectorOpen, setCardSelectorOpen] = useState(false)
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)
    const [selectedSectionName, setSelectedSectionName] = useState<string>("")
    const [databaseCards, setDatabaseCards] = useState<Record<string, ICard>>({})
    const [cardsLoading, setCardsLoading] = useState(false)
    const [sectionEditorOpen, setSectionEditorOpen] = useState(false)
    const [sectionToEdit, setSectionToEdit] = useState<IConfigurationItem | null>(null)

    useEffect(() => {
        const fetchCards = async () => {
            setCardsLoading(true)
            try {
                const response = await fetch("http://localhost:4000/api/cards")
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`)
                }
                const cardsData = await response.json()
                const cardsRecord: Record<string, ICard> = {}
                cardsData.forEach((card: ICard) => {
                    cardsRecord[card._id] = card
                })
                setDatabaseCards(cardsRecord)
            } catch (error) {
                console.error("Error fetching cards:", error)
            } finally {
                setCardsLoading(false)
            }
        }
        fetchCards()
    }, [])

    const handleAddSection = async () => {
        if (newSectionName.trim()) {
            const result = await onAddConfigItem({
                name: newSectionName.trim(),
                type: newSectionType,
                sortCardsBy: newSectionOption,
                cards: [],
            })

            if (result !== null) {
                setNewSectionName("")
                setNewSectionType("slideshow")
                setNewSectionOption("views")
                setShowAddForm(false)
            }
        }
    }

    const openCardSelector = (sectionId: string, sectionName: string) => {
        setSelectedSectionId(sectionId)
        setSelectedSectionName(sectionName)
        setCardSelectorOpen(true)
    }

    const handleAddCardsToSection = (sectionId: string, cardIds: string[]) => {
        if (sectionId && cardIds.length > 0) {
            onAddCardsToSection(sectionId, cardIds)
        }
    }

    const openSectionEditor = (section: IConfigurationItem) => {
        setSectionToEdit(section)
        setSectionEditorOpen(true)
    }

    const handleUpdateSection = (sectionId: string, updates: Partial<IConfigurationItem>) => {
        onUpdateConfigItem(sectionId, updates)
        setSectionEditorOpen(false)
        setSectionToEdit(null)
    }

    if (isLoading) {
        return (
            <LoadingContainer>
                <Loader size={40} className="animate-spin"/>
                <p>Loading configuration...</p>
            </LoadingContainer>
        )
    }

    if (configItems.length === 0 && !showAddForm) {
        return (
            <EmptyStateContainer>
                <h3>No configuration items found</h3>
                <p>Add your first section to get started</p>
                <AddSectionButton onClick={() => setShowAddForm(true)}>
                    <Plus size={24}/>
                </AddSectionButton>
            </EmptyStateContainer>
        )
    }

    const renderSection = (item: IConfigurationItem, index: number) => {
        const sectionCardIds = item.cards || []
        const sectionCards = sectionCardIds
            .map((cardId) => databaseCards[cardId])
            .filter(Boolean)
            .map((card) => ({
                id: card._id,
                content: card.name,
                description: card.description || "",
                image: card.imageUrl,
                views: card.viewsCount,
            }))

        return (
            <Draggable draggableId={item._id || `temp-${index}`} index={index} key={item._id || `temp-${index}`}>
                {(provided) => (
                    <SectionWrapper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        onMouseEnter={() => setHoveredSectionId(item._id || null)}
                        onMouseLeave={() => setHoveredSectionId(null)}>
                        <SectionHeader>
                            <SectionDragHandle {...provided.dragHandleProps}>
                                <GripVertical size={16}/>
                            </SectionDragHandle>
                            <div>
                                <SectionTitle>
                                    {item.name}
                                    {item.sortCardsBy && <SectionOption>{item.sortCardsBy}</SectionOption>}
                                </SectionTitle>
                                <SectionType>{item.type}</SectionType>
                            </div>
                            <div style={{display: "flex", marginLeft: "auto"}}>
                                <AddCardsButton
                                    onClick={() => openCardSelector(item._id || "", item.name)}
                                    title="Add cards to this section">
                                    <PlusCircle size={16}/>
                                </AddCardsButton>
                                {hoveredSectionId === item._id && (
                                    <>
                                        <EditSectionButton onClick={() => openSectionEditor(item)} title="Edit section">
                                            <Edit size={16}/>
                                        </EditSectionButton>
                                        <DeleteSectionButton onClick={() => item._id && onDeleteConfigItem(item._id)}>
                                            <Trash2 size={16}/>
                                        </DeleteSectionButton>
                                    </>
                                )}
                            </div>
                        </SectionHeader>
                        <SectionContent className={item.type}>
                            {cardsLoading ? (
                                <div className="placeholder-text">Loading cards...</div>
                            ) : sectionCards.length > 0 ? (
                                <Droppable droppableId={item._id || `section-${index}`} direction="horizontal"
                                           type="card">
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            style={{display: "flex", gap: "16px", width: "100%", overflowX: "auto"}}>
                                            {sectionCards.map((card, cardIndex) => (
                                                <ContentBlock
                                                    key={card.id}
                                                    block={card}
                                                    index={cardIndex}
                                                    sectionId={item._id || `section-${index}`}
                                                    onDeleteCard={onDeleteCardFromSection}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            ) : (
                                <div className="placeholder-text">No cards in this section. Click the + button to add
                                    cards.</div>
                            )}
                        </SectionContent>
                    </SectionWrapper>
                )}
            </Draggable>
        )
    }
    return (
        <>
            <CardSelector
                isOpen={cardSelectorOpen}
                onClose={() => setCardSelectorOpen(false)}
                onAddCards={handleAddCardsToSection}
                sectionId={selectedSectionId || ""}
                sectionName={selectedSectionName}
            />
            <SectionEditor
                isOpen={sectionEditorOpen}
                onClose={() => {
                    setSectionEditorOpen(false)
                    setSectionToEdit(null)
                }}
                onSave={handleUpdateSection}
                section={sectionToEdit}
            />
            <Droppable droppableId="all-sections" direction="vertical" type="section">
                {(provided) => (
                    <ScreenContainer {...provided.droppableProps} ref={provided.innerRef}>
                        {configItems.map((item, index) => {
                            return renderSection(item, index)
                        })}
                        {provided.placeholder}
                        {showAddForm ? (
                            <AddSectionForm>
                                <FormRow>
                                    <FormLabel>Section Name</FormLabel>
                                    <FormInput
                                        type="text"
                                        placeholder="Enter section name"
                                        value={newSectionName}
                                        onChange={(e) => setNewSectionName(e.target.value)}
                                        autoFocus
                                    />
                                </FormRow>
                                <FormRow>
                                    <FormLabel>Section Type</FormLabel>
                                    <FormSelect
                                        value={newSectionType}
                                        onChange={(e) => setNewSectionType(e.target.value as IConfigurationItem["type"])}
                                    >
                                        <option value="slideshow">Slideshow</option>
                                        <option value="2_row_horizontal">2 Row Horizontal</option>
                                        <option value="1_row_horizontal">1 Row Horizontal</option>
                                        <option value="single_card_description">Single Card Description</option>
                                    </FormSelect>
                                </FormRow>
                                <FormRow>
                                    <FormLabel>Sort Option</FormLabel>
                                    <FormSelect
                                        value={newSectionOption}
                                        onChange={(e) => setNewSectionOption(e.target.value as IConfigurationItem["sortCardsBy"])}
                                    >
                                        <option value="views">Views</option>
                                        <option value="created">Created</option>
                                        <option value="last_watched">Last Watched</option>
                                    </FormSelect>
                                </FormRow>
                                <FormRow>
                                    <FormButton onClick={handleAddSection} disabled={!newSectionName}>
                                        Save
                                    </FormButton>
                                    <FormButton onClick={() => setShowAddForm(false)} secondary>
                                        Cancel
                                    </FormButton>
                                </FormRow>
                            </AddSectionForm>
                        ) : (
                            <AddSectionContainer>
                                <AddSectionButton onClick={() => setShowAddForm(true)}>
                                    <Plus size={24}/>
                                </AddSectionButton>
                            </AddSectionContainer>
                        )}
                    </ScreenContainer>
                )}
            </Droppable>
        </>
    )
}

export default ScreenBuilder
