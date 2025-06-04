import { getFileExtension } from "@/lib/utils"
import type { IBinResponse } from "@codebinx/shared"

export function downloadBin(bin: IBinResponse) {
    const file = new Blob([bin.content], { type: "text/plain" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(file)
    a.download = `${bin.title || bin.binId}.${getFileExtension(bin.language)}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
