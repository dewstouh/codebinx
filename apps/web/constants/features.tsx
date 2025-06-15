// components/features.tsx o constants/features.ts
import { Zap, Shield, Code, Users, Copy, Eye } from "lucide-react"
import type { JSX } from "react"

interface FeatureItem {
    icon: JSX.Element
    title: string
    description: string
}

export const FEATURES: FeatureItem[] = [
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Lightning Fast",
        description: "Optimized for speed with instant loading and sharing",
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Secure by Default",
        description: "Password protection and private bins keep your code safe",
    },
    {
        icon: <Code className="w-6 h-6" />,
        title: "Syntax Highlighting",
        description: "Beautiful highlighting for 100+ programming languages",
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Team Collaboration",
        description: "Share with your team or make it public for everyone",
    },
    {
        icon: <Copy className="w-6 h-6" />,
        title: "One-Click Copy",
        description: "Copy code or share links with a single click",
    },
    {
        icon: <Eye className="w-6 h-6" />,
        title: "View Analytics",
        description: "Track views and engagement on your shared bins",
    },
]
