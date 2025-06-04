import { useState } from "react"
import { getFileExtension } from "@/lib/utils"
import type { IBinResponse } from "@codebinx/shared"

export function useBinActions(bin: IBinResponse) {
    const [copied, setCopied] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [editorLoading, setEditorLoading] = useState(true)

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(bin.content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const copyUrl = async () => {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const downloadBin = () => {
        const element = document.createElement("a")
        const file = new Blob([bin.content], { type: "text/plain" })
        element.href = URL.createObjectURL(file)
        element.download = `${bin.title || bin.binId}.${getFileExtension(bin.language)}`
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    return {
        copied,
        isFullscreen,
        editorLoading,
        copyToClipboard,
        copyUrl,
        downloadBin,
        toggleFullscreen: () => setIsFullscreen(prev => !prev),
        setEditorLoading,
    }
}
