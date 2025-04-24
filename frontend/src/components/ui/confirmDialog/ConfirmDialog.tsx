import type React from "react"
import {X} from "lucide-react"
import {
    DialogOverlay,
    DialogContainer,
    DialogHeader,
    DialogTitle,
    DialogCloseButton,
    DialogContent,
    DialogMessage,
    DialogActions,
    ConfirmButton,
    CancelButton,
} from "./ConfirmDialog.styles"
import type {ConfirmDialogProps} from "../../../types"

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
                                                         isOpen,
                                                         title,
                                                         message,
                                                         confirmLabel = "Confirm",
                                                         cancelLabel = "Cancel",
                                                         onConfirm,
                                                         onCancel,
                                                     }) => {
    if (!isOpen) return null

    return (
        <DialogOverlay onClick={onCancel}>
            <DialogContainer onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogCloseButton onClick={onCancel}>
                        <X size={18}/>
                    </DialogCloseButton>
                </DialogHeader>
                <DialogContent>
                    <DialogMessage>{message}</DialogMessage>
                </DialogContent>
                <DialogActions>
                    <CancelButton onClick={onCancel}>{cancelLabel}</CancelButton>
                    <ConfirmButton onClick={onConfirm}>{confirmLabel}</ConfirmButton>
                </DialogActions>
            </DialogContainer>
        </DialogOverlay>
    )
}

export default ConfirmDialog
