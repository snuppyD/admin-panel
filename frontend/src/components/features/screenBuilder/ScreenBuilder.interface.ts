import type {IConfigurationItem} from "../../../types"

export interface ScreenBuilderProps {
    configItems: IConfigurationItem[]
    onAddConfigItem: (configItem: Partial<IConfigurationItem>) => Promise<IConfigurationItem | null>
    onUpdateConfigItem: (id: string, configItem: Partial<IConfigurationItem>) => boolean
    onDeleteConfigItem: (id: string) => Promise<boolean>
    onReorderConfigItems: (sourceIndex: number, destinationIndex: number) => void
    onAddCardsToSection: (sectionId: string, cardIds: string[]) => Promise<boolean>
    onDeleteCardFromSection: (sectionId: string, cardId: string) => Promise<boolean>
    isLoading: boolean
}
