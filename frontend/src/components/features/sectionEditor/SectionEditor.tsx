import type React from "react"
import {useState, useEffect} from "react"
import {X} from "lucide-react"
import {
    EditorOverlay,
    EditorContainer,
    EditorHeader,
    EditorTitle,
    CloseButton,
    EditorContent,
    FormRow,
    FormLabel,
    FormInput,
    FormSelect,
    EditorFooter,
    CancelButton,
    SaveButton,
} from "./SectionEditor.styles"
import type {SectionEditorProps} from "./SectionEditor.interface"
import type {IConfigurationItem} from "../../../types"

const SectionEditor: React.FC<SectionEditorProps> = ({isOpen, onClose, onSave, section}) => {
    const [sectionName, setSectionName] = useState("")
    const [sectionType, setSectionType] = useState<IConfigurationItem["type"]>("slideshow")
    const [sectionSortOption, setSectionSortOption] = useState<IConfigurationItem["sortCardsBy"]>("views")
    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        if (section) {
            setSectionName(section.name)
            setSectionType(section.type)
            setSectionSortOption(section.sortCardsBy)
            setHasChanges(false)
        }
    }, [section])

    useEffect(() => {
        if (section) {
            setHasChanges(
                sectionName !== section.name || sectionType !== section.type || sectionSortOption !== section.sortCardsBy,
            )
        }
    }, [sectionName, sectionType, sectionSortOption, section])

    const handleSave = () => {
        if (!section || !hasChanges) return
        onSave(section._id || "", {
            name: sectionName,
            type: sectionType,
            sortCardsBy: sectionSortOption,
        })
        onClose()
    }

    if (!isOpen || !section) return null

    return (
        <EditorOverlay onClick={onClose}>
            <EditorContainer onClick={(e) => e.stopPropagation()}>
                <EditorHeader>
                    <EditorTitle>Edit Section</EditorTitle>
                    <CloseButton onClick={onClose}>
                        <X size={20}/>
                    </CloseButton>
                </EditorHeader>
                <EditorContent>
                    <FormRow>
                        <FormLabel>Section Name</FormLabel>
                        <FormInput type="text" value={sectionName} onChange={(e) => setSectionName(e.target.value)}
                                   autoFocus/>
                    </FormRow>
                    <FormRow>
                        <FormLabel>Section Type</FormLabel>
                        <FormSelect
                            value={sectionType}
                            onChange={(e) => setSectionType(e.target.value as IConfigurationItem["type"])}>
                            <option value="slideshow">Slideshow</option>
                            <option value="2_row_horizontal">2 Row Horizontal</option>
                            <option value="1_row_horizontal">1 Row Horizontal</option>
                            <option value="single_card_description">Single Card Description</option>
                        </FormSelect>
                    </FormRow>
                    <FormRow>
                        <FormLabel>Sort Option</FormLabel>
                        <FormSelect
                            value={sectionSortOption}
                            onChange={(e) => setSectionSortOption(e.target.value as IConfigurationItem["sortCardsBy"])}>
                            <option value="views">Views</option>
                            <option value="created">Created</option>
                            <option value="last_watched">Last Watched</option>
                        </FormSelect>
                    </FormRow>
                </EditorContent>
                <EditorFooter>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SaveButton onClick={handleSave} disabled={!hasChanges || !sectionName.trim()}>
                        Save Changes
                    </SaveButton>
                </EditorFooter>
            </EditorContainer>
        </EditorOverlay>
    )
}

export default SectionEditor
