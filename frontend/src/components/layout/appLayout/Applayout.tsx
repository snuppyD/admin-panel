import type React from "react"
import type {ReactNode} from "react"
import {MainContainer} from "./AppLayout.styles"

interface AppLayoutProps {
    children: ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
    return <MainContainer>{children}</MainContainer>
}

export default AppLayout
