import {API_ENDPOINTS, fetchApi} from "./api"
import type {IActiveConfiguration, IConfiguration, IConfigurationItem} from "../types"

export async function getAllConfigurations(): Promise<IConfiguration[]> {
    return fetchApi<IConfiguration[]>(API_ENDPOINTS.configurations)
}

export async function getActiveConfigurationId(): Promise<string | null> {
    try {
        const activeConfigs = await fetchApi<IActiveConfiguration[] | IActiveConfiguration>(
            API_ENDPOINTS.activeConfiguration,
        )

        if (Array.isArray(activeConfigs) && activeConfigs.length > 0) {
            return activeConfigs[0].activeConfigurationId
        } else if (activeConfigs && typeof activeConfigs === "object" && "activeConfigurationId" in activeConfigs) {
            return (activeConfigs as IActiveConfiguration).activeConfigurationId
        }

        return null
    } catch (error) {
        console.error("Error fetching active configuration ID:", error)
        return null
    }
}

export async function createConfiguration(
    name: string,
    configuration: IConfigurationItem[] = [],
): Promise<IConfiguration> {
    const requestBody = {name, configuration}
    return await fetchApi<IConfiguration>(API_ENDPOINTS.configurations, {
        method: "POST",
        body: JSON.stringify(requestBody),
    })
}

export async function updateConfiguration(
    id: string,
    updates: { name?: string; configuration?: IConfigurationItem[] },
): Promise<IConfiguration> {
    return fetchApi<IConfiguration>(API_ENDPOINTS.updateConfiguration(id), {
        method: "PUT",
        body: JSON.stringify(updates),
    })
}

export async function deleteConfiguration(id: string): Promise<void> {
    return fetchApi<void>(API_ENDPOINTS.deleteConfiguration(id), {
        method: "DELETE",
    })
}

export async function setActiveConfiguration(id: string): Promise<void> {
    return fetchApi<void>(API_ENDPOINTS.setActiveConfiguration(id), {
        method: "PUT",
    })
}
