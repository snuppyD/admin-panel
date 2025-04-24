import styled from "styled-components"

export const PreviewOverlay = styled.div`
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

export const PreviewContainer = styled.div`
    background-color: ${(props) => props.theme.colors.backgroundLight};
    border-radius: 8px;
    width: 90%;
    max-width: 450px;
    height: 90vh;
    max-height: 800px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

export const PreviewHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

export const PreviewTitle = styled.h3`
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

export const PreviewContent = styled.div`
    flex: 1;
    overflow-y: auto;
    background-color: #000;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 0; /* Remove any top padding */
`

export const StatusBar = styled.div`
    height: 24px;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    color: white;
    font-size: 12px;
`

export const StatusBarTime = styled.div`
    font-weight: 600;
`

export const StatusBarIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    .signal {
        display: flex;
        align-items: flex-end;
        height: 10px;
        gap: 1px;

        .bar {
            width: 2px;
            background-color: white;
            border-radius: 1px;

            &:nth-child(1) {
                height: 4px;
            }

            &:nth-child(2) {
                height: 6px;
            }

            &:nth-child(3) {
                height: 8px;
            }

            &:nth-child(4) {
                height: 10px;
            }
        }
    }

    .wifi {
        width: 14px;
        height: 10px;
        position: relative;

        &:before {
            content: '';
            position: absolute;
            border: 2px solid white;
            border-radius: 50%;
            width: 12px;
            height: 12px;
            top: -6px;
            left: 0;
        }

        &:after {
            content: '';
            position: absolute;
            border: 2px solid white;
            border-radius: 50%;
            width: 6px;
            height: 6px;
            top: -3px;
            left: 3px;
        }
    }

    .battery {
        width: 16px;
        height: 8px;
        border: 1px solid white;
        border-radius: 2px;
        padding: 1px;
        position: relative;

        &:after {
            content: '';
            position: absolute;
            width: 2px;
            height: 4px;
            background-color: white;
            right: -3px;
            top: 2px;
            border-radius: 0 2px 2px 0;
        }

        .battery-level {
            height: 100%;
            width: 80%;
            background-color: #4CD964;
            border-radius: 1px;
        }
    }
`

export const AppHeader = styled.div`
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const AppTitle = styled.h1`
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: white;
`

export const SearchIcon = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`

export const SectionContainer = styled.div`
    margin-bottom: 24px;
    padding: 0 16px;
`

export const SectionTitle = styled.h2`
    margin: 0 0 12px 0;
    font-size: 18px;
    font-weight: 600;
    color: white;
    display: flex;
    align-items: center;
`

export const SectionBadge = styled.span`
    margin-left: 8px;
    font-size: 16px;
`

export const CardGrid = styled.div`
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 8px;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;

    &.numbered {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 12px;
        overflow-x: visible;
    }

    &.two-row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        overflow-x: auto;
        grid-auto-flow: row;
        padding-bottom: 12px;
    }

    &.one-row {
        > div {
            min-width: 140px;
            flex-shrink: 0;
        }
    }

    &.single-card-description {
        flex-direction: row;

        > div {
            min-width: 280px;
            flex-shrink: 0;
            margin-right: 12px;
        }
    }

    /* Hide scrollbar */

    &::-webkit-scrollbar {
        display: none;
    }

    scrollbar-width: none;
`

export const CardContainer = styled.div`
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;

    &.featured {
        height: 240px;
        margin-bottom: 16px;
        width: 100%;
    }

    &.regular {
        height: 200px;
        min-width: 140px;
        flex-shrink: 0;
    }

    &.full-width {
        height: 180px;
        width: 100%;
        min-width: 280px;
    }
`

export const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const CardOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7));
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 16px;
`

export const CardPlayButton = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
`

export const CardTitle = styled.div`
    position: absolute;
    bottom: 24px;
    left: 8px;
    right: 8px;
    color: white;
    font-size: 12px;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);

    &.large {
        position: relative;
        bottom: auto;
        left: auto;
        right: auto;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
    }
`

export const CardViews = styled.div`
    position: absolute;
    bottom: 8px;
    left: 8px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
`

export const ExclusiveBadge = styled.div`
    position: absolute;
    top: 8px;
    left: 8px;
    background-color: #8A2BE2;
    color: white;
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
`

export const NumberedCard = styled.div`
    position: relative;
    height: 180px;
    border-radius: 8px;
    overflow: hidden;
`

export const CardNumber = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
`

export const BottomNavigation = styled.div`
    height: 60px;
    background-color: #000;
    border-top: 1px solid #333;
    display: flex;
    margin-top: auto;
`

export const NavItem = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #888;

    &.active {
        color: ${(props) => props.theme.colors.primary};
    }

    .icon {
        width: 24px;
        height: 24px;
        margin-bottom: 4px;

        &.home {
            background-color: currentColor;
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'%3E%3C/path%3E%3Cpolyline points='9 22 9 12 15 12 15 22'%3E%3C/polyline%3E%3C/svg%3E");
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
        }

        &.browse {
            background-color: currentColor;
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cpath d='m21 21-4.3-4.3'%3E%3C/path%3E%3C/svg%3E");
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
        }

        &.rewards {
            background-color: currentColor;
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2v20'%3E%3C/path%3E%3Cpath d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'%3E%3C/path%3E%3C/svg%3E");
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
        }

        &.profile {
            background-color: currentColor;
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E");
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
        }
    }
`

export const NavText = styled.div`
    font-size: 10px;
`

export const CardDescription = styled.div`
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    margin: 8px 0;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`
