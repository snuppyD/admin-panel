export interface IConfigurationItem {
    _id?: string
    name: string
    type: "slideshow" | "2_row_horizontal" | "1_row_horizontal" | "single_card_description"
    sortCardsBy: "views" | "created" | "last_watched"
    cards?: string[]
}

export interface IConfiguration {
    _id: string
    name: string
    configuration: IConfigurationItem[]
}

export interface IActiveConfiguration {
    _id: string
    activeConfigurationId: string
}

export interface ICard {
    _id: string
    name: string
    description?: string
    imageUrl: string
    viewsCount: number
}

export interface SidebarProps {
    isOpen: boolean
    toggleSidebar: () => void
    configurations: IConfiguration[]
    activeConfigId: string | null
    displayedConfigId: string | null
    onSelectConfiguration: (id: string) => void
    onSetActiveConfiguration: (id: string) => void
    onDeleteConfiguration: (id: string) => void
    onAddConfiguration: (name: string) => void
    isLoading: boolean
}

export interface ContentBlockProps {
    block: {
        id: string
        content: string
        image?: string
        views?: number
    }
    index: number
    sectionId: string
    onDeleteCard?: (sectionId: string, cardId: string) => void
}

export interface ConfirmDialogProps {
    isOpen: boolean
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    onConfirm: () => void
    onCancel: () => void
}
