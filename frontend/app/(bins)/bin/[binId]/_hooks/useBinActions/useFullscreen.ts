import { useState } from "react"

export function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const toggle = () => setIsFullscreen(prev => !prev)
    return { isFullscreen, toggle }
}
