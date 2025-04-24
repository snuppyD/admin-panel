import "styled-components";

declare module "styled-components" {
    interface DefaultTheme {
        colors: {
            primary: string;
            primaryHover: string;
            background: string;
            backgroundLight: string;
            backgroundMedium: string;
            backgroundDark: string;
            border: string;
            borderLight: string;
            text: string;
            textMuted: string;
            danger: string;
            dangerHover: string;
        };
        breakpoints: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
    }
}