import type React from "react"
import {useState} from "react"
import {Copy, Check, Loader} from "lucide-react"
import {JSONContainer, JSONHeader, CopyButton, JSONContent, JSONPre, LoadingContainer} from "./JsonView.styles"
import type {JSONViewProps} from "./JsonView.interface"

const JsonView: React.FC<JSONViewProps> = ({data, isLoading, activeConfig}) => {
    const [copied, setCopied] = useState(false)
    const handleCopy = () => {
        if (!data) return
        const jsonToCopy = activeConfig ? JSON.stringify(activeConfig, null, 2) : JSON.stringify(data, null, 2)
        navigator.clipboard.writeText(jsonToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
    if (isLoading) {
        return (
            <LoadingContainer>
                <Loader size={40} className="animate-spin"/>
                <p>Loading configuration data...</p>
            </LoadingContainer>
        )
    }
    if (!activeConfig && !data) {
        return (
            <JSONContainer>
                <JSONHeader>
                    <h2>JSON Data</h2>
                </JSONHeader>
                <JSONContent>
                    <JSONPre>No active configuration selected</JSONPre>
                </JSONContent>
            </JSONContainer>
        )
    }
    const displayData = activeConfig || data
    return (
        <JSONContainer>
            <JSONHeader>
                <h2>Active Configuration JSON Data</h2>
                <CopyButton onClick={handleCopy}>
                    {copied ? <Check size={16}/> : <Copy size={16}/>}
                    {copied ? "Copied!" : "Copy"}
                </CopyButton>
            </JSONHeader>
            <JSONContent>
                <JSONPre>{JSON.stringify(displayData, null, 2)}</JSONPre>
            </JSONContent>
        </JSONContainer>
    )
}

export default JsonView
