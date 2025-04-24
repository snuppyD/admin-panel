import styled from "styled-components"

export const SelectorOverlay = styled.div`
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

export const SelectorContainer = styled.div`
    background-color: ${(props) => props.theme.colors.backgroundLight};
    border-radius: 8px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

export const SelectorHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

export const SelectorTitle = styled.h3`
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

export const SelectorContent = styled.div`
    padding: 20px;
    overflow-y: auto;
    max-height: 60vh;
`

export const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
`

export const CardItem = styled.div<{ $isSelected: boolean }>`
    background-color: ${(props) => props.theme.colors.backgroundMedium};
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    border: 2px solid ${(props) => (props.$isSelected ? props.theme.colors.primary : "transparent")};
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
`

export const CardImage = styled.img`
    width: 100%;
    height: 120px;
    object-fit: cover;
`

export const CardContent = styled.div`
    padding: 12px;
`

export const CardName = styled.h4`
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 500;
`

export const CardDescription = styled.p`
    margin: 0;
    font-size: 12px;
    color: ${(props) => props.theme.colors.textMuted};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

export const CardViews = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
    font-size: 12px;
    color: ${(props) => props.theme.colors.textMuted};
`

export const SelectionCheckmark = styled.div<{ $isSelected: boolean }>`
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${(props) => (props.$isSelected ? props.theme.colors.primary : "rgba(255, 255, 255, 0.2)")};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => (props.$isSelected ? props.theme.colors.background : props.theme.colors.text)};
`

export const SelectorFooter = styled.div`
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

export const AddButton = styled.button`
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

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    gap: 20px;
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
    min-height: 200px;
    gap: 16px;
    color: ${(props) => props.theme.colors.textMuted};
    text-align: center;

    h3 {
        color: ${(props) => props.theme.colors.text};
        margin: 0;
    }
`

export const SearchContainer = styled.div`
    margin-bottom: 16px;

    .search-row {
        display: flex;
        gap: 8px;
        align-items: center;
    }
`

export const SearchInput = styled.input`
    background-color: ${(props) => props.theme.colors.backgroundMedium};
    border: 1px solid ${(props) => props.theme.colors.borderLight};
    border-radius: 4px;
    color: ${(props) => props.theme.colors.text};
    padding: 10px 12px;
    font-size: 14px;
    flex: 1;

    &:focus {
        outline: none;
        border-color: ${(props) => props.theme.colors.primary};
    }
`

export const SelectAllButton = styled.button`
    background-color: ${(props) => props.theme.colors.borderLight};
    color: ${(props) => props.theme.colors.text};
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        background-color: ${(props) => props.theme.colors.backgroundMedium};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:active {
        transform: translateY(1px);
    }
`
