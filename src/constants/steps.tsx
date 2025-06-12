import { Code, Globe, Shield } from "lucide-react"
import { JSX } from "react"

interface StepItem {
    step: string
    title: string
    description: string
    icon: JSX.Element
}

export const steps: StepItem[] = [
    {
        step: "01",
        title: "Paste your code",
        description:
            "Simply paste your code snippet into our beautiful editor. Choose your language for perfect syntax highlighting.",
        icon: <Code className="w-8 h-8" />,
    },
    {
        step: "02",
        title: "Customize settings",
        description:
            "Set privacy options, add a password, choose expiration time, and give your bin a memorable title.",
        icon: <Shield className="w-8 h-8" />,
    },
    {
        step: "03",
        title: "Share instantly",
        description:
            "Get a short, shareable link instantly. Your code is now accessible to anyone you choose to share it with.",
        icon: <Globe className="w-8 h-8" />,
    },
]