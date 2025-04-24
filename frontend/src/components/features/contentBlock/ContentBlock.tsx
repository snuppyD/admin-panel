import type React from "react"
import {useState} from "react"
import {Draggable} from "@hello-pangea/dnd"
import {Eye, MoreVertical, Edit2, Trash2} from "lucide-react"
import {
    BlockContainer,
    BlockImage,
    BlockContent,
    BlockTitle,
    BlockFooter,
    ViewCount,
    ActionMenu,
    ActionButton,
    MenuDropdown,
} from "./ContentBlock.styles"
import {formatViewCount} from "../../../services/cardService"
import type {ContentBlockProps} from "../../../types"

const ContentBlock: React.FC<ContentBlockProps> = ({block, index, sectionId, onDeleteCard}) => {
    const [showMenu, setShowMenu] = useState(false)
    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowMenu(!showMenu)
    }
    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowMenu(false)
    }
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowMenu(false)
        if (onDeleteCard) {
            onDeleteCard(sectionId, block.id)
        }
    }
    const handleClickOutside = () => {
        if (showMenu) {
            setShowMenu(false)
        }
    }
    return (
        <Draggable draggableId={`${sectionId}-${block.id}`} index={index}>
            {(provided, snapshot) => (
                <BlockContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                    onClick={handleClickOutside}
                >
                    <BlockImage src={block.image || "/placeholder.svg?height=120&width=180"} alt={block.content}/>
                    <BlockContent>
                        <BlockTitle>{block.content}</BlockTitle>
                        <BlockFooter>
                            <ViewCount>
                                <Eye size={14}/>
                                <span>{formatViewCount(block.views || 0)}</span>
                            </ViewCount>
                            <ActionMenu>
                                <MoreVertical size={16} onClick={toggleMenu}/>
                                {showMenu && (
                                    <MenuDropdown>
                                        <ActionButton onClick={handleEdit}>
                                            <Edit2 size={14}/>
                                            <span>Edit</span>
                                        </ActionButton>
                                        <ActionButton className="delete" onClick={handleDelete}>
                                            <Trash2 size={14}/>
                                            <span>Delete</span>
                                        </ActionButton>
                                    </MenuDropdown>
                                )}
                            </ActionMenu>
                        </BlockFooter>
                    </BlockContent>
                </BlockContainer>
            )}
        </Draggable>
    )
}

export default ContentBlock
