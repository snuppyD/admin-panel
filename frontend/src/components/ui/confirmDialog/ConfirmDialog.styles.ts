import styled from "styled-components"

export const DialogOverlay = styled.div`
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

export const DialogContainer = styled.div`
    background-color: ${(props) => props.theme.colors.backgroundLight};
    border-radius: 8px;
    width: 90%;
    max-width: 450px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.2s ease-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

export const DialogHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

export const DialogTitle = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
`

export const DialogCloseButton = styled.button`
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

export const DialogContent = styled.div`
    padding: 20px;
`

export const DialogMessage = styled.p`
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
    color: ${(props) => props.theme.colors.text};
`

export const DialogActions = styled.div`
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

export const ConfirmButton = styled.button`
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

    &.danger {
        background-color: ${(props) => props.theme.colors.danger};

        &:hover {
            background-color: ${(props) => props.theme.colors.dangerHover};
        }
    }
`
