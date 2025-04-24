import type React from "react"
import {useState} from "react"
import {X, Plus, Trash2, CheckCircle, Circle, Loader} from "lucide-react"
import {
    SidebarContainer,
    SidebarHeader,
    SidebarTitle,
    MobileCloseButton,
    SidebarOverlay,
    BlockList,
    BlockItem,
    BlockName,
    DeleteBlockButton,
    AddBlockButton,
    NewBlockForm,
    BlockInput,
    SaveButton,
    ActiveIndicator,
    LoadingIndicator,
    EmptyStateMessage,
} from "./Sidebar.styles"
import type {SidebarProps} from "../../../types"

const Sidebar: React.FC<SidebarProps> = ({
                                             isOpen,
                                             toggleSidebar,
                                             configurations,
                                             activeConfigId,
                                             displayedConfigId,
                                             onSelectConfiguration,
                                             onSetActiveConfiguration,
                                             onDeleteConfiguration,
                                             onAddConfiguration,
                                             isLoading,
                                         }) => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [newConfigName, setNewConfigName] = useState("")
    const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null)

    const handleAddConfiguration = () => {
        if (newConfigName.trim()) {
            onAddConfiguration(newConfigName.trim())
            setNewConfigName("")
            setShowAddForm(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddConfiguration()
        }
    }

    const handleActiveIndicatorClick = (e: React.MouseEvent, configId: string) => {
        e.stopPropagation()
        if (configId !== activeConfigId) {
            onSetActiveConfiguration(configId)
        }
    }

    return (
        <>
            {isOpen && <SidebarOverlay onClick={toggleSidebar}/>}
            <SidebarContainer $isOpen={isOpen}>
                <SidebarHeader>
                    <SidebarTitle>Configurations</SidebarTitle>
                    <MobileCloseButton onClick={toggleSidebar}>
                        <X size={20}/>
                    </MobileCloseButton>
                </SidebarHeader>
                {!activeConfigId && configurations.length > 0 && (
                    <div
                        style={{
                            padding: "10px",
                            backgroundColor: "rgba(200, 255, 0, 0.1)",
                            borderBottom: "1px solid #2d2d3f",
                            fontSize: "12px",
                            textAlign: "center",
                        }}>
                        <strong>No active configuration</strong>
                        <div style={{marginTop: "4px"}}>Click a circle icon to set one active</div>
                    </div>
                )}
                {isLoading ? (
                    <LoadingIndicator>
                        <Loader size={24} className="animate-spin"/>
                        <span>Loading configurations...</span>
                    </LoadingIndicator>
                ) : configurations.length === 0 ? (
                    <EmptyStateMessage>
                        <p>No configurations found</p>
                        <p>Create your first configuration</p>
                    </EmptyStateMessage>
                ) : (
                    <BlockList>
                        {configurations.map((config) => {
                            return (
                                <BlockItem
                                    key={config._id}
                                    onMouseEnter={() => setHoveredBlockId(config._id)}
                                    onMouseLeave={() => setHoveredBlockId(null)}
                                    $isActive={config._id === activeConfigId}
                                    $isDisplayed={config._id === displayedConfigId}
                                    $isHovered={hoveredBlockId === config._id}
                                    onClick={() => onSelectConfiguration(config._id)}
                                    style={{cursor: "pointer"}}
                                >
                                    <ActiveIndicator
                                        onClick={(e) => handleActiveIndicatorClick(e, config._id)}
                                        title={config._id === activeConfigId ? "Active configuration" : "Set as active configuration"}
                                        style={{cursor: config._id === activeConfigId ? "default" : "pointer"}}
                                    >
                                        {config._id === activeConfigId ? (
                                            <CheckCircle size={16} className="active"/>
                                        ) : (
                                            <Circle size={16}/>
                                        )}
                                    </ActiveIndicator>
                                    <BlockName>{config.name}</BlockName>
                                    <div className="block-actions">
                                        {hoveredBlockId === config._id && (
                                            <DeleteBlockButton
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onDeleteConfiguration(config._id)
                                                }}>
                                                <Trash2 size={16}/>
                                            </DeleteBlockButton>
                                        )}
                                    </div>
                                </BlockItem>
                            )
                        })}
                    </BlockList>
                )}
                {showAddForm ? (
                    <NewBlockForm>
                        <BlockInput
                            type="text"
                            placeholder="Enter configuration name"
                            value={newConfigName}
                            onChange={(e) => setNewConfigName(e.target.value)}
                            onKeyDown={handleKeyPress}
                            autoFocus/>
                        <SaveButton onClick={handleAddConfiguration}>Save</SaveButton>
                    </NewBlockForm>
                ) : (
                    <AddBlockButton onClick={() => setShowAddForm(true)}>
                        <Plus size={20}/>
                    </AddBlockButton>
                )}
            </SidebarContainer>
        </>
    )
}

export default Sidebar
