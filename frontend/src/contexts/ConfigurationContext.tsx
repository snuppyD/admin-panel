import {createContext, useContext, type ReactNode} from "react"
import {useConfigurations} from "../hooks"
import type {IConfiguration, IConfigurationItem} from "../types"

interface ConfigurationContextType {
    configurations: IConfiguration[]
    activeConfigId: string | null
    displayedConfigId: string | null
    currentConfig: IConfiguration | null
    tempConfigItems: IConfigurationItem[]
    hasUnsavedChanges: boolean
    loading: boolean
    error: Error | null

    fetchConfigurations: () => Promise<IConfiguration[]>
    selectConfiguration: (id: string) => void
    setActiveConfiguration: (id: string) => Promise<boolean>
    addConfiguration: (name: string) => Promise<IConfiguration | null>
    deleteConfiguration: (id: string) => Promise<boolean>
    addConfigItem: (configItem: Partial<IConfigurationItem>) => Promise<IConfigurationItem | null>
    updateConfigItem: (id: string, updates: Partial<IConfigurationItem>) => boolean
    deleteConfigItem: (id: string) => Promise<boolean>
    reorderConfigItems: (sourceIndex: number, destinationIndex: number) => void
    reorderCardsInSection: (sectionId: string, sourceIndex: number, destinationIndex: number) => void // Add this line
    addCardsToSection: (sectionId: string, cardIds: string[]) => Promise<boolean>
    deleteCardFromSection: (sectionId: string, cardId: string) => Promise<boolean>
    saveChanges: () => Promise<boolean>
    cancelChanges: () => void
}

const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined)

export function ConfigurationProvider({children}: { children: ReactNode }) {
    const configurationState = useConfigurations()
    return <ConfigurationContext.Provider value={configurationState}>{children}</ConfigurationContext.Provider>
}

export function useConfigurationContext() {
    const context = useContext(ConfigurationContext)
    if (context === undefined) {
        throw new Error("useConfigurationContext must be used within a ConfigurationProvider")
    }
    return context
}
