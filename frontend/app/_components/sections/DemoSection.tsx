// app/_components/DemoSection.tsx

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Code, Pause, Play, Share2 } from "lucide-react"

interface DemoStep {
    title: string
    description: string
    code: string
    language: string
}

const demoSteps: DemoStep[] = [
    {
        title: "Paste your code",
        description: "Start by pasting your code snippet",
        code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
        language: "javascript",
    },
    {
        title: "Choose settings",
        description: "Configure privacy and sharing options",
        code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`,
        language: "javascript",
    },
    {
        title: "Share instantly",
        description: "Get a shareable link in seconds",
        code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
console.log("Shared on CodeBinX!");`,
        language: "javascript",
    },
]

export function DemoSection() {
    const [currentDemoStep, setCurrentDemoStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        if (!isPlaying) return
        const interval = setInterval(() => {
            setCurrentDemoStep((prev) => (prev + 1) % demoSteps.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [isPlaying])

    return (
        <>
            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                {/* Header del demo */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Code className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">CodeBinX Demo</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                </div>

                {/* Indicador de paso */}
                <div className="flex items-center space-x-2 mb-6">
                    {demoSteps.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentDemoStep ? "bg-blue-500 w-8" : "bg-gray-200 w-2"
                                }`}
                        />
                    ))}
                </div>

                {/* Contenido animado del demo */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentDemoStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="h-[400px] flex flex-col"
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {demoSteps[currentDemoStep].title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {demoSteps[currentDemoStep].description}
                            </p>
                        </div>

                        {/* “Mock Editor” */}
                        <div className="bg-gray-900 rounded-2xl overflow-hidden flex-1 flex flex-col">
                            {/* Header del editor simulado */}
                            <div className="flex items-center space-x-2 p-4 bg-gray-800">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <div className="ml-4 text-gray-400 text-sm">fibonacci.js</div>
                            </div>

                            {/* Líneas de código con animación ligera */}
                            <div className="p-6 font-mono text-sm flex-1 relative">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    {demoSteps[currentDemoStep].code.split("\n").map((line, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                                            className="mb-1"
                                        >
                                            <span className="text-gray-500 mr-4 select-none">{idx + 1}</span>
                                            <span className="text-gray-300">{line}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Mensaje final (en el último paso) */}
                                {currentDemoStep === demoSteps.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="absolute bottom-4 left-6 right-6 p-3 bg-green-50 rounded-lg border border-green-200"
                                    >
                                        <div className="flex items-center space-x-2 text-green-800">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-xs font-medium">
                                                Bin created successfully!
                                            </span>
                                        </div>
                                        <div className="mt-1 text-xs text-green-700 font-mono">
                                            https://codebinx.com/bin/abc123
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Barra de estado “falsa” */}
                            <div className="bg-blue-600 text-white px-4 py-1 text-xs flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <span>JavaScript</span>
                                    <span>UTF-8</span>
                                </div>
                                <span>CodeBinX</span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navegación manual de pasos */}
                <div className="flex justify-center space-x-2 mt-6">
                    {demoSteps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentDemoStep(index)
                                setIsPlaying(false)
                            }}
                            className={`w-3 h-3 rounded-full transition-colors ${index === currentDemoStep
                                    ? "bg-blue-500"
                                    : "bg-gray-300 hover:bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Elementos flotantes */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
            >
                <Code className="w-5 h-5" />
            </motion.div>
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-full shadow-lg"
            >
                <Share2 className="w-5 h-5" />
            </motion.div>
        </>
    )
}
