import {useState, useEffect, useCallback} from "react"
import {toast} from "react-toastify"
import * as configService from "../services/configurationService"
import type {IConfiguration, IConfigurationItem} from "../types"

export function useConfigurations() {
    const [configurations, setConfigurations] = useState<IConfiguration[]>([])
    const [activeConfigId, setActiveConfigId] = useState<string | null>(null)
    const [displayedConfigId, setDisplayedConfigId] = useState<string | null>(null)
    const [currentConfig, setCurrentConfig] = useState<IConfiguration | null>(null)
    const [tempConfigItems, setTempConfigItems] = useState<IConfigurationItem[]>([])
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [hasInitialized, setHasInitialized] = useState(false)

    const fetchConfigurations = useCallback(async () => {
        try {
            setLoading(true)
            const configs = await configService.getAllConfigurations()
            setConfigurations(configs)
            return configs
        } catch (err) {
            setError(err as Error)
            return []
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchActiveConfigId = useCallback(async () => {
        try {
            const activeId = await configService.getActiveConfigurationId()
            if (activeId) {
                setActiveConfigId(activeId)
                return activeId
            }
            return null
        } catch (err) {
            console.error("Error fetching active configuration ID:", err)
            setError(err as Error)
            return null
        }
    }, [])

    useEffect(() => {
        if (hasInitialized) {
            return
        }

        const initializeConfigs = async () => {
            setLoading(true)
            try {
                const configs = await fetchConfigurations()
                const activeId = await fetchActiveConfigId()

                if (activeId) {
                    setActiveConfigId(activeId)
                    setDisplayedConfigId(activeId)
                    const activeConfig = configs.find((c) => c._id === activeId)
                    if (activeConfig) {
                        setCurrentConfig(activeConfig)
                        setTempConfigItems(activeConfig.configuration || [])
                    } else {
                        console.warn(`Active configuration with ID ${activeId} not found in configs`)
                    }
                } else {

                    if (configs.length > 0) {
                        setDisplayedConfigId(configs[0]._id)
                        setCurrentConfig(configs[0])
                        setTempConfigItems(configs[0].configuration || [])
                    } else {
                        console.log("No configurations found")
                    }
                }

                setHasInitialized(true)
            } catch (err) {
                console.error("Error during initialization:", err)
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        initializeConfigs()
    }, [fetchConfigurations, fetchActiveConfigId])

    useEffect(() => {
        if (configurations.length && displayedConfigId) {
            const config = configurations.find((c) => c._id === displayedConfigId)
            if (config) {
                setCurrentConfig(config)
                setTempConfigItems(config.configuration || [])
                setHasUnsavedChanges(false)
            }
        }
    }, [configurations, displayedConfigId])

    const selectConfiguration = useCallback(
        (id: string) => {
            if (hasUnsavedChanges) {
                if (window.confirm("You have unsaved changes. Are you sure you want to switch configurations?")) {
                    setDisplayedConfigId(id)
                }
            } else {
                setDisplayedConfigId(id)
            }
        },
        [hasUnsavedChanges],
    )

    const setActiveConfiguration = useCallback(async (id: string) => {
        try {
            await configService.setActiveConfiguration(id)
            setActiveConfigId(id)
            setDisplayedConfigId(id)
            toast.success("Active configuration updated")
            return true
        } catch (err) {
            console.error("Error setting active configuration:", err)
            toast.error(`Failed to set active configuration: ${(err as Error).message}`)
            return false
        }
    }, [])

    const addConfiguration = useCallback(
        async (name: string) => {
            try {
                const newConfig = await configService.createConfiguration(name)
                const updatedConfigs = await fetchConfigurations()
                const createdConfig = updatedConfigs.find((c) => c.name === name)

                if (createdConfig) {
                    setDisplayedConfigId(createdConfig._id)
                    setCurrentConfig(createdConfig)
                    setTempConfigItems(createdConfig.configuration || [])
                }

                toast.success("New configuration created")
                return newConfig
            } catch (err) {
                console.error("Error creating configuration:", err)
                toast.error(`Failed to create configuration: ${(err as Error).message}`)
                return null
            }
        },
        [fetchConfigurations],
    )

    const deleteConfiguration = useCallback(
        async (id: string) => {
            try {
                await configService.deleteConfiguration(id)

                setConfigurations((prev) => prev.filter((c) => c._id !== id))

                if (id === displayedConfigId) {
                    setDisplayedConfigId(activeConfigId)
                }

                if (id === activeConfigId) {
                    const remainingConfigs = configurations.filter((c) => c._id !== id)
                    if (remainingConfigs.length > 0) {
                        const newActiveId = remainingConfigs[0]._id
                        await configService.setActiveConfiguration(newActiveId)
                        setActiveConfigId(newActiveId)
                        setDisplayedConfigId(newActiveId)
                    } else {
                        setActiveConfigId(null)
                        setDisplayedConfigId(null)
                    }
                }

                toast.success("Configuration deleted")
                return true
            } catch (err) {
                toast.error(`Failed to delete configuration: ${(err as Error).message}`)
                return false
            }
        },
        [configurations, activeConfigId, displayedConfigId],
    )

    const addConfigItem = useCallback(
        async (configItem: Partial<IConfigurationItem>) => {
            if (!currentConfig || !displayedConfigId) return null
            try {
                const completeConfigItem: IConfigurationItem = {
                    name: configItem.name || "",
                    type: configItem.type || "slideshow",
                    sortCardsBy: configItem.sortCardsBy || "views",
                    cards: configItem.cards || [],
                    _id: configItem._id,
                }

                const updatedConfig = await configService.updateConfiguration(displayedConfigId, {
                    configuration: [...tempConfigItems, completeConfigItem],
                })

                if (updatedConfig && updatedConfig.configuration) {
                    setTempConfigItems(updatedConfig.configuration)
                    setCurrentConfig((prev) => {
                        if (!prev) return null
                        return {
                            ...prev,
                            configuration: updatedConfig.configuration,
                        }
                    })

                    await fetchConfigurations()

                    setHasUnsavedChanges(false)
                    toast.success("Section added successfully")
                    return updatedConfig.configuration[updatedConfig.configuration.length - 1]
                }
                return null
            } catch (err) {
                toast.error(`Failed to add section: ${(err as Error).message}`)
                return null
            }
        },
        [currentConfig, displayedConfigId, tempConfigItems, fetchConfigurations],
    )

    const updateConfigItem = useCallback(
        (id: string, updates: Partial<IConfigurationItem>) => {
            const updatedItems = tempConfigItems.map((item) => (item._id === id ? {...item, ...updates} : item))
            setTempConfigItems(updatedItems)
            setHasUnsavedChanges(true)
            return true
        },
        [tempConfigItems],
    )

    const deleteConfigItem = useCallback(
        async (id: string) => {
            if (!currentConfig || !displayedConfigId) return false
            const updatedItems = tempConfigItems.filter((item) => item._id !== id)
            setTempConfigItems(updatedItems)
            try {
                await configService.updateConfiguration(displayedConfigId, {
                    configuration: updatedItems,
                })
                setCurrentConfig((prev) => {
                    if (!prev) return null
                    return {
                        ...prev,
                        configuration: updatedItems,
                    }
                })
                await fetchConfigurations()
                setHasUnsavedChanges(false)
                toast.success("Section deleted successfully")
                return true
            } catch (err) {
                setHasUnsavedChanges(true)
                toast.error(`Failed to delete section: ${(err as Error).message}`)
                return false
            }
        },
        [currentConfig, displayedConfigId, tempConfigItems, fetchConfigurations],
    )

    const reorderConfigItems = useCallback((sourceIndex: number, destinationIndex: number) => {
        setTempConfigItems((prev) => {
            const result = Array.from(prev)
            const [removed] = result.splice(sourceIndex, 1)
            result.splice(destinationIndex, 0, removed)
            return result
        })
        setHasUnsavedChanges(true)
    }, [])

    const reorderCardsInSection = useCallback((sectionId: string, sourceIndex: number, destinationIndex: number) => {
        setTempConfigItems((prev) => {
            return prev.map((item) => {
                if (item._id === sectionId && item.cards) {
                    const newCards = [...item.cards]
                    const [movedCard] = newCards.splice(sourceIndex, 1)
                    newCards.splice(destinationIndex, 0, movedCard)
                    return {
                        ...item,
                        cards: newCards,
                    }
                }
                return item
            })
        })
        setHasUnsavedChanges(true)
    }, [])

    const addCardsToSection = useCallback(
        async (sectionId: string, cardIds: string[]) => {
            if (!currentConfig || !displayedConfigId) return false
            const updatedItems = tempConfigItems.map((item) => {
                if (item._id === sectionId) {
                    const currentCards = item.cards || []
                    const updatedCards = [...currentCards]
                    cardIds.forEach((cardId) => {
                        if (!updatedCards.includes(cardId)) {
                            updatedCards.push(cardId)
                        }
                    })
                    return {
                        ...item,
                        cards: updatedCards,
                    }
                }
                return item
            })
            setTempConfigItems(updatedItems)
            try {
                await configService.updateConfiguration(displayedConfigId, {
                    configuration: updatedItems,
                })
                setCurrentConfig((prev) => {
                    if (!prev) return null
                    return {
                        ...prev,
                        configuration: updatedItems,
                    }
                })
                await fetchConfigurations()
                setHasUnsavedChanges(false)
                toast.success("Cards added to section successfully")
                return true
            } catch (err) {
                setHasUnsavedChanges(true)
                toast.error(`Failed to add cards: ${(err as Error).message}`)
                return false
            }
        },
        [currentConfig, displayedConfigId, tempConfigItems, fetchConfigurations],
    )

    const deleteCardFromSection = useCallback(
        async (sectionId: string, cardId: string) => {
            if (!currentConfig || !displayedConfigId) return false
            const updatedItems = tempConfigItems.map((item) => {
                if (item._id === sectionId) {
                    const currentCards = item.cards || []
                    return {
                        ...item,
                        cards: currentCards.filter((id) => id !== cardId),
                    }
                }
                return item
            })
            setTempConfigItems(updatedItems)
            try {
                await configService.updateConfiguration(displayedConfigId, {
                    configuration: updatedItems,
                })
                setCurrentConfig((prev) => {
                    if (!prev) return null
                    return {
                        ...prev,
                        configuration: updatedItems,
                    }
                })
                await fetchConfigurations()
                setHasUnsavedChanges(false)
                toast.success("Card removed from section successfully")
                return true
            } catch (err) {
                setHasUnsavedChanges(true)
                toast.error(`Failed to remove card: ${(err as Error).message}`)
                return false
            }
        },
        [currentConfig, displayedConfigId, tempConfigItems, fetchConfigurations],
    )

    const saveChanges = useCallback(async () => {
        if (!currentConfig || !displayedConfigId) return false
        try {
            await configService.updateConfiguration(displayedConfigId, {
                configuration: tempConfigItems,
            })
            setCurrentConfig((prev) => {
                if (!prev) return null
                return {
                    ...prev,
                    configuration: tempConfigItems,
                }
            })
            await fetchConfigurations()
            setHasUnsavedChanges(false)
            toast.success("Changes saved successfully")
            return true
        } catch (err) {
            toast.error(`Failed to save changes: ${(err as Error).message}`)
            return false
        }
    }, [currentConfig, displayedConfigId, tempConfigItems, fetchConfigurations])

    const cancelChanges = useCallback(() => {
        if (currentConfig) {
            setTempConfigItems(currentConfig.configuration || [])
            setHasUnsavedChanges(false)
        }
    }, [currentConfig])

    return {
        configurations,
        activeConfigId,
        displayedConfigId,
        currentConfig,
        tempConfigItems,
        hasUnsavedChanges,
        loading,
        error,

        fetchConfigurations,
        selectConfiguration,
        setActiveConfiguration,
        addConfiguration,
        deleteConfiguration,
        addConfigItem,
        updateConfigItem,
        deleteConfigItem,
        reorderConfigItems,
        addCardsToSection,
        deleteCardFromSection,
        saveChanges,
        cancelChanges,
        reorderCardsInSection,
    }
}
