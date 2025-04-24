import type React from "react"
import {useState, useEffect} from "react"
import {X, Play, ExternalLink} from "lucide-react"
import {
    PreviewOverlay,
    PreviewContainer,
    PreviewHeader,
    PreviewTitle,
    CloseButton,
    PreviewContent,
    AppHeader,
    AppTitle,
    SearchIcon,
    SectionContainer,
    SectionTitle,
    SectionBadge,
    CardGrid,
    CardContainer,
    CardImage,
    CardOverlay,
    CardPlayButton,
    CardTitle,
    CardViews,
    ExclusiveBadge,
    NumberedCard,
    CardNumber,
    BottomNavigation,
    NavItem,
    NavText,
    CardDescription,
} from "./MobilePreview.styles"
import type {MobilePreviewProps} from "./MobilePreview.interface"
import type {ICard} from "../../../types"
import type {IConfigurationItem} from "../../../types"

const MobilePreview: React.FC<MobilePreviewProps> = ({isOpen, onClose, configItems}) => {
    const [databaseCards, setDatabaseCards] = useState<Record<string, ICard>>({})
    const [cardsLoading, setCardsLoading] = useState(false)
    useEffect(() => {
        if (isOpen) {
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
        }
    }, [isOpen])

    if (!isOpen) return null

    const renderSection = (item: IConfigurationItem, index: number) => {
        const sectionCardIds = item.cards || []
        const sectionCards = sectionCardIds.map((cardId: string) => databaseCards[cardId]).filter(Boolean)

        if (sectionCards.length === 0 && !cardsLoading) {
            return null
        }

        const getBadgeIcon = (name: string) => {
            const nameLower = name.toLowerCase()
            if (nameLower.includes("Top Chart")) return "🔥"
            if (nameLower.includes("love")) return "❤️"
            if (nameLower.includes("Best Choices")) return "👍"
            if (nameLower.includes("азійське")) return "🌸"
            if (nameLower.includes("Most Trending")) return "💫"
            if (nameLower.includes("Secret Identity")) return "💋"
            return "💎"
        }

        if (index === 0 && item.type === "slideshow" && sectionCards.length > 0) {
            return (
                <SectionContainer key={item._id || index}>
                    <SectionTitle>
                        {item.name} <SectionBadge>{getBadgeIcon(item.name)}</SectionBadge>
                    </SectionTitle>
                    <CardContainer className="featured">
                        <CardImage src={sectionCards[0].imageUrl} alt={sectionCards[0].name}/>
                        <CardOverlay>
                            <CardPlayButton>
                                <Play fill="white" size={24}/>
                            </CardPlayButton>
                        </CardOverlay>
                        <ExclusiveBadge>EXCLUSIVE</ExclusiveBadge>
                    </CardContainer>
                </SectionContainer>
            )
        }

        if (item.name.includes("Топ") || item.name.toLowerCase().includes("top")) {
            return (
                <SectionContainer key={item._id || index}>
                    <SectionTitle>
                        {item.name} <SectionBadge>{getBadgeIcon(item.name)}</SectionBadge>
                    </SectionTitle>
                    <CardGrid className="numbered">
                        {sectionCards.slice(0, 6).map((card: ICard, cardIndex: number) => (
                            <NumberedCard key={card._id}>
                                <CardNumber>{cardIndex + 1}</CardNumber>
                                <CardImage src={card.imageUrl} alt={card.name}/>
                                {cardIndex % 2 === 0 && <ExclusiveBadge>EXCLUSIVE</ExclusiveBadge>}
                                <CardViews>
                                    <Play size={12} fill="white"/>
                                    {card.viewsCount.toLocaleString()}
                                </CardViews>
                            </NumberedCard>
                        ))}
                    </CardGrid>
                </SectionContainer>
            )
        }

        if (item.type === "single_card_description") {
            return (
                <SectionContainer key={item._id || index}>
                    <SectionTitle>
                        {item.name} <SectionBadge>{getBadgeIcon(item.name)}</SectionBadge>
                    </SectionTitle>
                    <CardGrid className="single-card-description">
                        {sectionCards.map((card: ICard) => (
                            <CardContainer key={card._id} className="full-width">
                                <CardImage src={card.imageUrl} alt={card.name}/>
                                {Math.random() > 0.5 && <ExclusiveBadge>EXCLUSIVE</ExclusiveBadge>}
                                <CardOverlay>
                                    <CardTitle className="large">{card.name}</CardTitle>
                                    <CardDescription>{card.description || "No description available"}</CardDescription>
                                    <CardViews>
                                        <Play size={12} fill="white"/>
                                        {card.viewsCount.toLocaleString()}
                                    </CardViews>
                                </CardOverlay>
                            </CardContainer>
                        ))}
                    </CardGrid>
                    {sectionCards.length > 1 && (
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "10px",
                                color: "#a0a0a0",
                                marginTop: "8px",
                            }}>
                            Swipe for more →
                        </div>
                    )}
                </SectionContainer>
            )
        }

        if (item.type === "2_row_horizontal") {
            return (
                <SectionContainer key={item._id || index}>
                    <SectionTitle>
                        {item.name} <SectionBadge>{getBadgeIcon(item.name)}</SectionBadge>
                    </SectionTitle>
                    <CardGrid className="two-row">
                        {sectionCards.map((card: ICard) => (
                            <CardContainer key={card._id} className="regular">
                                <CardImage src={card.imageUrl} alt={card.name}/>
                                {Math.random() > 0.5 && <ExclusiveBadge>EXCLUSIVE</ExclusiveBadge>}
                                <CardTitle>{card.name}</CardTitle>
                                <CardViews>
                                    <Play size={12} fill="white"/>
                                    {card.viewsCount.toLocaleString()}
                                </CardViews>
                            </CardContainer>
                        ))}
                    </CardGrid>
                </SectionContainer>
            )
        }

        return (
            <SectionContainer key={item._id || index}>
                <SectionTitle>
                    {item.name} <SectionBadge>{getBadgeIcon(item.name)}</SectionBadge>
                </SectionTitle>
                <CardGrid className="one-row">
                    {sectionCards.map((card: ICard) => (
                        <CardContainer key={card._id} className="regular">
                            <CardImage src={card.imageUrl} alt={card.name}/>
                            {Math.random() > 0.5 && <ExclusiveBadge>EXCLUSIVE</ExclusiveBadge>}
                            <CardTitle>{card.name}</CardTitle>
                            <CardViews>
                                <Play size={12} fill="white"/>
                                {card.viewsCount.toLocaleString()}
                            </CardViews>
                        </CardContainer>
                    ))}
                </CardGrid>
                {sectionCards.length > 3 && (
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "10px",
                            color: "#a0a0a0",
                            marginTop: "8px",
                        }}>
                        Swipe for more →
                    </div>
                )}
            </SectionContainer>
        )
    }

    return (
        <PreviewOverlay onClick={onClose}>
            <PreviewContainer onClick={(e) => e.stopPropagation()}>
                <PreviewHeader>
                    <PreviewTitle>Mobile Preview</PreviewTitle>
                    <CloseButton onClick={onClose}>
                        <X size={20}/>
                    </CloseButton>
                </PreviewHeader>
                <PreviewContent>
                    <AppHeader>
                        <AppTitle>My Drama</AppTitle>
                        <SearchIcon>
                            <ExternalLink size={20}/>
                        </SearchIcon>
                    </AppHeader>
                    {cardsLoading ? (
                        <SectionContainer>
                            <div style={{textAlign: "center", padding: "20px"}}>Loading cards...</div>
                        </SectionContainer>
                    ) : (
                        configItems.map((item, index) => renderSection(item, index)).filter(Boolean)
                    )}
                    <BottomNavigation>
                        <NavItem className="active">
                            <div className="icon home"></div>
                            <NavText>Головна</NavText>
                        </NavItem>
                        <NavItem>
                            <div className="icon browse"></div>
                            <NavText>Огляд</NavText>
                        </NavItem>
                        <NavItem>
                            <div className="icon rewards"></div>
                            <NavText>Нагороди</NavText>
                        </NavItem>
                        <NavItem>
                            <div className="icon profile"></div>
                            <NavText>Профіль</NavText>
                        </NavItem>
                    </BottomNavigation>
                </PreviewContent>
            </PreviewContainer>
        </PreviewOverlay>
    )
}

export default MobilePreview
