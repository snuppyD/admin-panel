import styled from "styled-components"

export const JSONContainer = styled.div`
    padding: 20px;

    @media (max-width: 768px) {
        padding: 15px;
    }
`

export const JSONHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h2 {
        font-size: 18px;
        font-weight: 500;
    }
`

export const CopyButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: ${(props) => props.theme.colors.backgroundLight};
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    color: ${(props) => props.theme.colors.text};
    font-size: 14px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.backgroundMedium};
    }

    svg {
        color: ${(props) => props.theme.colors.primary};
    }
`

export const JSONContent = styled.div`
    background-color: ${(props) => props.theme.colors.backgroundLight};
    border-radius: 8px;
    padding: 16px;
    overflow-x: auto;
    max-height: calc(100vh - 150px);
    overflow-y: auto;
`

export const JSONPre = styled.pre`
    margin: 0;
    font-family: 'Fira Code', 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    color: ${(props) => props.theme.colors.text};

    @media (max-width: 768px) {
        font-size: 12px;
    }
`

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    gap: 20px;
    color: ${(props) => props.theme.colors.textMuted};

    svg {
        color: ${(props) => props.theme.colors.primary};
    }
`
