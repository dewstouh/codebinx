import { useState } from "react"
import { useClipboard } from "./useClipboard"
import type { IBinResponse } from "@codebinx/shared"
import { useFullscreen } from "./useFullscreen"
import { downloadBin } from "../../_lib/download"

export function useBinActions (bin: IBinResponse) {
    const { copied, copy } = useClipboard()
    const { isFullscreen, toggle } = useFullscreen()
    const [editorLoading, setEditorLoading] = useState(true)

    const copyToClipboard = () => copy(bin.content)
    const copyUrl = () => copy(window.location.href)

    return {
        copied,
        isFullscreen,
        editorLoading,
        copyToClipboard,
        copyUrl,
        downloadBin: () => downloadBin(bin),
        toggleFullscreen: toggle,
        setEditorLoading,
    }
}
