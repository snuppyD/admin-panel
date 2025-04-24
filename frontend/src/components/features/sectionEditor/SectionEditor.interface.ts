import type {IConfigurationItem} from "../../../types"

export interface SectionEditorProps {
    isOpen: boolean
    onClose: () => void
    onSave: (sectionId: string, updates: Partial<IConfigurationItem>) => void
    section: IConfigurationItem | null
}
