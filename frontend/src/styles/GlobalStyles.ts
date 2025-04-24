import {createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: #fff;
        background-color: #1a1a2e;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    * {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
`

export const theme = {
    colors: {
        primary: "#c8ff00",
        primaryHover: "#d9ff33",
        background: "#1a1a2e",
        backgroundLight: "#232336",
        backgroundMedium: "#2d2d3f",
        backgroundDark: "#1e1e32",
        border: "#2d2d3f",
        borderLight: "#3d3d4f",
        text: "#fff",
        textMuted: "#a0a0a0",
        danger: "#ff6b6b",
        dangerHover: "#ff8585",
    },
    breakpoints: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
    },
}
export type Theme = typeof theme