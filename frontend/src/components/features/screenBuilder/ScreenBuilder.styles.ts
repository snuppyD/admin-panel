import styled from "styled-components"

export const ScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    overflow-y: auto;
    flex: 1;
    width: 100%;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        padding: 15px;
        gap: 15px;
    }
`

export const SectionWrapper = styled.div`
    background-color: ${(props) => props.theme.colors.backgroundLight};
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        padding: 12px;
    }
`

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        margin-bottom: 12px;
    }
`

export const SectionDragHandle = styled.div`
    cursor: grab;
    color: ${(props) => props.theme.colors.textMuted};
    margin-right: 12px;
    display: flex;
    align-items: center;

    &:hover {
        color: ${(props) => props.theme.colors.text};
    }
`

export const SectionTitle = styled.h3`
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        font-size: 14px;
    }
`

export const SectionOption = styled.span`
    font-size: 12px;
    font-weight: normal;
    color: ${(props) => props.theme.colors.primary};
    background-color: rgba(200, 255, 0, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
`

export const SectionType = styled.div`
    font-size: 12px;
    color: ${(props) => props.theme.colors.textMuted};
    margin-top: 4px;
`

export const DeleteSectionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.danger};
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;

    &:hover {
        background-color: rgba(255, 107, 107, 0.1);
    }
`

export const EditSectionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.textMuted};
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    margin-right: 4px;

    &:hover {
        color: ${(props) => props.theme.colors.text};
        background-color: ${(props) => props.theme.colors.borderLight};
    }
`

export const AddCardsButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.primary};
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    margin-right: 4px;

    &:hover {
        background-color: rgba(200, 255, 0, 0.1);
    }
`

export const SectionContent = styled.div`
    display: flex;
    overflow-x: auto;
    padding: 20px;
    gap: 16px;
    min-height: 150px;
    position: relative;
    background-color: ${(props) => props.theme.colors.backgroundDark};
    border-radius: 6px;
    width: 100%;

    &.slideshow {
        justify-content: flex-start;
    }

    &.single_card_description {
        flex-direction: column;
        align-items: center;
    }

    &.1_row_horizontal, &.2_row_horizontal {
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .placeholder-text {
        color: ${(props) => props.theme.colors.textMuted};
        font-style: italic;
        text-align: center;
        padding: 20px;
        border: 1px dashed ${(props) => props.theme.colors.borderLight};
        border-radius: 4px;
        background-color: rgba(45, 45, 63, 0.5);
        margin: auto;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        gap: 12px;
    }
`

export const AddSectionContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 0;
    width: 100%;
`

export const AddSectionButton = styled.button`
    background-color: ${(props) => props.theme.colors.backgroundMedium};
    border: 1px dashed ${(props) => props.theme.colors.borderLight};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.primary};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.borderLight};
    }
`

export const AddSectionForm = styled.div`
    background-color: ${(props) => props.theme.colors.backgroundLight};
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`

export const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;

    &:last-child {
        flex-direction: row;
        gap: 12px;
        margin-top: 8px;
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

export const FormButton = styled.button<{ secondary?: boolean }>`
    background-color: ${(props) => (props.secondary ? props.theme.colors.borderLight : props.theme.colors.primary)};
    color: ${(props) => (props.secondary ? props.theme.colors.text : props.theme.colors.background)};
    border: none;
    border-radius: 4px;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    flex: 1;

    &:hover {
        background-color: ${(props) => (props.secondary ? props.theme.colors.backgroundMedium : props.theme.colors.primaryHover)};
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
    min-height: 400px;
    gap: 20px;
    color: ${(props) => props.theme.colors.textMuted};
    width: 100%;

    svg {
        color: ${(props) => props.theme.colors.primary};
    }
`

export const EmptyStateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    gap: 16px;
    color: ${(props) => props.theme.colors.textMuted};
    text-align: center;
    width: 100%;

    h3 {
        color: ${(props) => props.theme.colors.text};
        margin: 0;
    }
`
