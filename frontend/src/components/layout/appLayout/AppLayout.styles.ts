import styled from "styled-components"

export const MainContainer = styled.div`
    display: flex;
    min-height: 100vh;
    position: relative;
    width: 100%;
`

export const ContentArea = styled.main`
    flex: 1;
    padding: 0;
    background-color: ${(props) => props.theme.colors.background};
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
`

export const PageHeader = styled.header`
    padding: 20px;
    height: 75px;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .header-left {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        padding: 15px;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;

        .header-left {
            width: 100%;
            justify-content: space-between;
        }
    }
`

export const PageTitle = styled.h1`
    font-size: 24px;
    font-weight: 600;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        font-size: 20px;
    }
`

export const ViewToggle = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.colors.backgroundLight};
    border-radius: 6px;
    padding: 2px;
`

export const ToggleButton = styled.button<{ $active: boolean }>`
    background-color: ${(props) => (props.$active ? props.theme.colors.borderLight : "transparent")};
    color: ${(props) => (props.$active ? props.theme.colors.primary : props.theme.colors.textMuted)};
    border: none;
    border-radius: 4px;
    padding: 6px 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
        color: ${(props) => (props.$active ? props.theme.colors.primary : props.theme.colors.text)};
    }
`

export const ActionButtons = styled.div`
    display: flex;
    gap: 10px;
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
`

export const CancelButton = styled.button`
    background-color: ${(props) => props.theme.colors.borderLight};
    color: ${(props) => props.theme.colors.text};
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.backgroundMedium};
    }
`

export const PreviewButton = styled.button`
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.primary};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 4px;

    &:hover {
        background-color: ${(props) => props.theme.colors.backgroundLight};
    }
`
