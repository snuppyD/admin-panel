import type React from "react"
import {useState, useCallback} from "react"
import {ThemeProvider} from "styled-components"
import {DragDropContext, type DropResult} from "@hello-pangea/dnd"
import {ToastContainer} from "react-toastify"
import {Columns, Code, Smartphone} from "lucide-react"
import "react-toastify/dist/ReactToastify.css"
import {GlobalStyles, theme} from "./styles/GlobalStyles"
import {ConfigurationProvider, useConfigurationContext} from "./contexts/ConfigurationContext"
import Sidebar from "./components/features/sidebar/Sidebar"
import ScreenBuilder from "./components/features/screenBuilder/ScreenBuilder"
import JSONView from "./components/features/jsonView/JsonView"
import ConfirmDialog from "./components/ui/confirmDialog/ConfirmDialog"
import MobilePreview from "./components/features/mobilePreview/MobilePreview"
import AppLayout from "./components/layout/appLayout/Applayout"
import {
    ContentArea,
    PageHeader,
    PageTitle,
    ActionButtons,
    SaveButton,
    CancelButton,
    ViewToggle,
    ToggleButton,
    PreviewButton,
} from "./components/layout/appLayout/AppLayout.styles"

const AppContent: React.FC = () => {
    const [viewMode, setViewMode] = useState<"visual" | "json">("visual")
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showMobilePreview, setShowMobilePreview] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: () => {
        },
    })
    const {
        configurations,
        activeConfigId,
        displayedConfigId,
        tempConfigItems,
        hasUnsavedChanges,
        loading,
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
    } = useConfigurationContext()

    const activeConfiguration = configurations.find((config) => config._id === activeConfigId)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const toggleViewMode = (mode: "visual" | "json") => {
        setViewMode(mode)
    }

    const toggleMobilePreview = () => {
        setShowMobilePreview(!showMobilePreview)
    }

    const handleSelectConfiguration = useCallback(
        (id: string) => {
            if (hasUnsavedChanges) {
                setConfirmDialog({
                    isOpen: true,
                    title: "Unsaved Changes",
                    message: "You have unsaved changes. Are you sure you want to switch configurations?",
                    onConfirm: () => {
                        setConfirmDialog((prev) => ({...prev, isOpen: false}))
                        selectConfiguration(id)
                    },
                })
            } else {
                selectConfiguration(id)
            }
        },
        [hasUnsavedChanges, selectConfiguration],
    )

    const handleSetActiveConfiguration = useCallback(
        (id: string) => {
            if (hasUnsavedChanges) {
                setConfirmDialog({
                    isOpen: true,
                    title: "Unsaved Changes",
                    message: "You have unsaved changes. Are you sure you want to set this configuration as active?",
                    onConfirm: () => {
                        setConfirmDialog((prev) => ({...prev, isOpen: false}))
                        setActiveConfiguration(id)
                    },
                })
            } else {
                setActiveConfiguration(id)
            }
        },
        [hasUnsavedChanges, setActiveConfiguration],
    )

    const handleDeleteConfiguration = useCallback(
        (id: string) => {
            if (id === activeConfigId) {
                setConfirmDialog({
                    isOpen: true,
                    title: "Delete Active Configuration",
                    message: "You are about to delete the active configuration. Are you sure?",
                    onConfirm: () => {
                        setConfirmDialog((prev) => ({...prev, isOpen: false}))
                        deleteConfiguration(id)
                    },
                })
            } else {
                setConfirmDialog({
                    isOpen: true,
                    title: "Delete Configuration",
                    message: "Are you sure you want to delete this configuration?",
                    onConfirm: () => {
                        setConfirmDialog((prev) => ({...prev, isOpen: false}))
                        deleteConfiguration(id)
                    },
                })
            }
        },
        [activeConfigId, deleteConfiguration],
    )

    const onDragEnd = useCallback(
        (result: DropResult) => {
            const {destination, source, type, draggableId} = result
            if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
                return
            }
            if (type === "section") {
                reorderConfigItems(source.index, destination.index)
            } else if (type === "card") {
                if (destination.droppableId === source.droppableId) {
                    const sectionId = destination.droppableId
                    reorderCardsInSection(sectionId, source.index, destination.index)
                } else {
                    const cardId = draggableId.split("-")[1]
                    if (cardId) {
                        deleteCardFromSection(source.droppableId, cardId).then((success) => {
                            if (success) {
                                addCardsToSection(destination.droppableId, [cardId])
                            }
                        })
                    }
                }
            }
        },
        [reorderConfigItems, reorderCardsInSection, deleteCardFromSection, addCardsToSection],
    )

    return (
        <AppLayout>
            <ToastContainer position="top-right" autoClose={3000}/>
            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                title={confirmDialog.title}
                message={confirmDialog.message}
                onConfirm={confirmDialog.onConfirm}
                onCancel={() => setConfirmDialog((prev) => ({...prev, isOpen: false}))}
            />
            <MobilePreview
                isOpen={showMobilePreview}
                onClose={() => setShowMobilePreview(false)}
                configItems={tempConfigItems}
            />
            <Sidebar
                isOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                configurations={configurations}
                activeConfigId={activeConfigId}
                displayedConfigId={displayedConfigId}
                onSelectConfiguration={handleSelectConfiguration}
                onSetActiveConfiguration={handleSetActiveConfiguration}
                onDeleteConfiguration={handleDeleteConfiguration}
                onAddConfiguration={addConfiguration}
                isLoading={loading}
            />
            <ContentArea>
                <PageHeader>
                    <div className="header-left">
                        <PageTitle>Mobile App Home Screen Builder</PageTitle>
                        <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                            <ViewToggle>
                                <ToggleButton
                                    $active={viewMode === "visual"}
                                    onClick={() => toggleViewMode("visual")}
                                    title="Visual Builder View"
                                >
                                    <Columns size={20}/>
                                </ToggleButton>
                                <ToggleButton
                                    $active={viewMode === "json"}
                                    onClick={() => toggleViewMode("json")}
                                    title="JSON Data View"
                                >
                                    <Code size={20}/>
                                </ToggleButton>
                            </ViewToggle>
                            <PreviewButton onClick={toggleMobilePreview} title="Mobile Preview">
                                <Smartphone size={20}/>
                            </PreviewButton>
                        </div>
                    </div>
                    {hasUnsavedChanges && (
                        <ActionButtons>
                            <SaveButton onClick={saveChanges}>Save</SaveButton>
                            <CancelButton onClick={cancelChanges}>Cancel</CancelButton>
                        </ActionButtons>
                    )}
                </PageHeader>
                {!activeConfigId && displayedConfigId && (
                    <div
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "rgba(200, 255, 0, 0.1)",
                            border: "1px solid #c8ff00",
                            borderRadius: "4px",
                            margin: "0 20px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <div>
                            <strong>No active configuration set.</strong> You are viewing a configuration that is not
                            currently
                            active.
                        </div>
                        <button
                            onClick={() => displayedConfigId && setActiveConfiguration(displayedConfigId)}
                            style={{
                                backgroundColor: "#c8ff00",
                                color: "#1a1a2e",
                                border: "none",
                                borderRadius: "4px",
                                padding: "8px 16px",
                                cursor: "pointer",
                                fontWeight: 600,
                            }}>
                            Set as Active
                        </button>
                    </div>
                )}
                {viewMode === "visual" ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <ScreenBuilder
                            configItems={tempConfigItems}
                            onAddConfigItem={addConfigItem}
                            onUpdateConfigItem={updateConfigItem}
                            onDeleteConfigItem={deleteConfigItem}
                            onReorderConfigItems={reorderConfigItems}
                            onAddCardsToSection={addCardsToSection}
                            onDeleteCardFromSection={deleteCardFromSection}
                            isLoading={loading || !displayedConfigId}
                        />
                    </DragDropContext>
                ) : (
                    <JSONView
                        data={tempConfigItems}
                        isLoading={loading}
                        activeConfig={
                            activeConfiguration
                                ? {
                                    _id: activeConfiguration._id,
                                    name: activeConfiguration.name,
                                    configuration: tempConfigItems,
                                }
                                : null
                        }
                    />
                )}
            </ContentArea>
        </AppLayout>
    )
}

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <ConfigurationProvider>
                <AppContent/>
            </ConfigurationProvider>
        </ThemeProvider>
    )
}

export default App
