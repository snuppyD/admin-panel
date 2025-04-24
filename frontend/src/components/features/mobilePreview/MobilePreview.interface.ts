import type {IConfigurationItem} from "../../../types"

export interface MobilePreviewProps {
    isOpen: boolean
    onClose: () => void
    configItems: IConfigurationItem[]
}
