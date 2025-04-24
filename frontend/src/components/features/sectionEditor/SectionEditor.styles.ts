import styled from "styled-components"

export const EditorOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100;
`

export const EditorContainer = styled.div`
    background-color: ${(props) => props.theme.colors.backgroundLight};
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

export const EditorHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

export const EditorTitle = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
`

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.textMuted};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 4px;

    &:hover {
        color: ${(props) => props.theme.colors.text};
        background-color: ${(props) => props.theme.colors.backgroundMedium};
    }
`

export const EditorContent = styled.div`
    padding: 20px;
`

export const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;

    &:last-child {
        margin-bottom: 0;
    }
`

export const FormLabel = styled.label`
    font-size: 14px;
    font-weight: 500;
`

export const FormInput = styled.input`
    background-color: ${(props) => props.theme.colors.backgroundMedium};
    border: 1px solid ${(props) => props.theme.colors.borderLight};
    border-radius: 4px;
    padding: 10px 12px;
    color: ${(props) => props.theme.colors.text};
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: ${(props) => props.theme.colors.primary};
    }
`

export const FormSelect = styled.select`
    background-color: ${(props) => props.theme.colors.backgroundMedium};
    border: 1px solid ${(props) => props.theme.colors.borderLight};
    border-radius: 4px;
    padding: 10px 12px;
    color: ${(props) => props.theme.colors.text};
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: ${(props) => props.theme.colors.primary};
    }

    option {
        background-color: ${(props) => props.theme.colors.backgroundMedium};
    }
`

export const EditorFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 20px;
    border-top: 1px solid ${(props) => props.theme.colors.border};
`

export const CancelButton = styled.button`
    background-color: ${(props) => props.theme.colors.borderLight};
    color: ${(props) => props.theme.colors.text};
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.backgroundMedium};
    }
`

export const SaveButton = styled.button`
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.background};
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.primaryHover};
    }

    &:disabled {
        background-color: ${(props) => props.theme.colors.borderLight};
        color: ${(props) => props.theme.colors.textMuted};
        cursor: not-allowed;
    }
`
