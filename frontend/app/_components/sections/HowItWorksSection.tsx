// app/_components/HowItWorksSection.tsx

"use client"

import { motion } from "framer-motion"
import { Code, Shield, Globe } from "lucide-react"

interface StepItem {
    step: string
    title: string
    description: string
    icon: JSX.Element
}

const steps: StepItem[] = [
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

export function HowItWorksSection() {
    return (
        <section className="py-32 px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        How it works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Three simple steps to share your code with the world
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
                    {steps.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-8 mx-auto">
                                {item.icon}
                            </div>
                            <div className="text-sm font-semibold text-gray-500 mb-4 tracking-wider">
                                STEP {item.step}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
