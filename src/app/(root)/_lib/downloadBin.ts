import { Bin } from "@prisma/client"

export function downloadBin(bin: Bin) {
    const file = new Blob([bin.content], { type: "text/plain" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(file)
    a.download = `${bin.title || bin.binId}.${bin.language}` // TODO: ADD GET FILE EXTENSION FUNCTION
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
