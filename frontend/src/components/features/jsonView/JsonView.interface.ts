import type {IConfiguration} from "../../../types"

export interface IConfigurationItem {
    [key: string]: any
}

export interface JSONViewProps {
    data: IConfiguration[] | IConfigurationItem[] | null
    isLoading: boolean
    activeConfig?: IConfiguration | null
}
