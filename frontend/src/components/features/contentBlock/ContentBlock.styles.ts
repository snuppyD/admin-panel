import styled from "styled-components"

export const BlockContainer = styled.div<{ isDragging: boolean }>`
    background-color: ${(props) => props.theme.colors.backgroundMedium};
    border-radius: 8px;
    overflow: hidden;
    min-width: 180px;
    max-width: 180px;
    box-shadow: ${(props) => (props.isDragging ? "0 10px 20px rgba(0, 0, 0, 0.3)" : "0 2px 4px rgba(0, 0, 0, 0.1)")};
    cursor: grab;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        min-width: 160px;
        max-width: 160px;
    }
`

export const BlockImage = styled.img`
    width: 100%;
    height: 100px;
    object-fit: cover;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        height: 90px;
    }
`

export const BlockContent = styled.div`
    padding: 12px;
`

export const BlockTitle = styled.h4`
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 8px 0;
    line-height: 1.4;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        font-size: 13px;
        margin-bottom: 6px;
    }
`

export const BlockFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const ViewCount = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${(props) => props.theme.colors.textMuted};
    font-size: 12px;

    svg {
        color: ${(props) => props.theme.colors.textMuted};
    }
`

export const ActionMenu = styled.div`
    position: relative;

    svg {
        cursor: pointer;
        color: ${(props) => props.theme.colors.textMuted};

        &:hover {
            color: ${(props) => props.theme.colors.text};
        }
    }
`

export const MenuDropdown = styled.div`
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: 8px;
    background-color: ${(props) => props.theme.colors.borderLight};
    border-radius: 4px;
    padding: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 100px;
`

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.text};
    font-size: 12px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    width: 100%;
    text-align: left;

    &:hover {
        background-color: ${(props) => props.theme.colors.backgroundMedium};
    }

    &.delete {
        color: ${(props) => props.theme.colors.danger};

        &:hover {
            background-color: rgba(255, 107, 107, 0.1);
        }
    }
`
