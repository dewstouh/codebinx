// app/_components/FeaturesGridSection.tsx

"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Code, Users, Copy, Eye } from "lucide-react"

interface FeatureItem {
    icon: JSX.Element
    title: string
    description: string
}

const features: FeatureItem[] = [
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

export function FeaturesGridSection() {
    return (
        <section className="py-32 px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Built for developers
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Every feature designed with the modern developer workflow in mind
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
