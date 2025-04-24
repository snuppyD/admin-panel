import styled from "styled-components"

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
    width: 280px;
    background-color: ${(props) => props.theme.colors.background};
    border-right: 1px solid ${(props) => props.theme.colors.border};
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    top: 0;
    z-index: 1000;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        position: fixed;
        left: ${(props) => (props.$isOpen ? "0" : "-280px")};
        transition: left 0.3s ease;
        box-shadow: ${(props) => (props.$isOpen ? "0 0 15px rgba(0, 0, 0, 0.5)" : "none")};
    }
`

export const SidebarOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: none;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        display: block;
    }
`

export const SidebarHeader = styled.div`
    padding: 20px;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const SidebarTitle = styled.h2`
    font-size: 18px;
    font-weight: 600;
`

export const MobileCloseButton = styled.button`
    display: none;
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export const BlockList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    overflow-y: auto;
`

export const BlockItem = styled.li<{ $isActive?: boolean; $isDisplayed?: boolean; $isHovered?: boolean }>`
    padding: 12px 20px;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    display: flex;
    align-items: center;
    background-color: ${(props) => {
        if (props.$isActive) return props.theme.colors.backgroundLight // Active configuration
        if (props.$isDisplayed) return props.theme.colors.backgroundDark // Currently displayed configuration
        return "transparent" // Default
    }};
    position: relative;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${(props) => {
            if (props.$isActive) return props.theme.colors.backgroundLight // Active configuration
            if (props.$isDisplayed) return props.theme.colors.backgroundDark // Currently displayed configuration
            return props.theme.colors.backgroundDark // Default hover
        }};
    }

    /* Left border for displayed configuration */
    border-left: ${(props) => (props.$isDisplayed ? `3px solid ${props.theme.colors.primary}` : "3px solid transparent")};

    .block-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: auto;
        opacity: ${(props) => (props.$isHovered ? 1 : 0)};
        transition: opacity 0.2s ease;
    }
`

export const ActiveIndicator = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;

    svg {
        color: ${(props) => props.theme.colors.textMuted};

        &.active {
            color: ${(props) => props.theme.colors.primary};
        }
    }

    &:hover svg:not(.active) {
        color: ${(props) => props.theme.colors.primary};
        opacity: 0.7;
    }
`

export const BlockName = styled.span`
    font-size: 14px;
    flex: 1;
`

export const DeleteBlockButton = styled.button`
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.danger};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 4px;

    &:hover {
        background-color: rgba(255, 107, 107, 0.1);
    }
`

export const AddBlockButton = styled.button`
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.primary};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    margin-top: auto;
    border-top: 1px solid ${(props) => props.theme.colors.border};

    &:hover {
        background-color: ${(props) => props.theme.colors.backgroundLight};
    }
`

export const NewBlockForm = styled.div`
    padding: 16px;
    margin-top: auto;
    border-top: 1px solid ${(props) => props.theme.colors.border};
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const BlockInput = styled.input`
    background-color: ${(props) => props.theme.colors.backgroundLight};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 4px;
    color: ${(props) => props.theme.colors.text};
    padding: 8px 12px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: ${(props) => props.theme.colors.primary};
    }
`

export const SaveButton = styled.button`
    background-color: ${(props) => props.theme.colors.primary};
    border: none;
    border-radius: 4px;
    color: ${(props) => props.theme.colors.background};
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.primaryHover};
    }
`

export const LoadingIndicator = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    gap: 16px;
    color: ${(props) => props.theme.colors.textMuted};

    svg {
        color: ${(props) => props.theme.colors.primary};
    }
`

export const EmptyStateMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    gap: 8px;
    color: ${(props) => props.theme.colors.textMuted};
    text-align: center;

    p:first-child {
        font-weight: 500;
        color: ${(props) => props.theme.colors.text};
    }
`
