"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Code,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Users,
  Copy,
  Eye,
  Clock,
  ExternalLink,
  Play,
  Pause,
  Share2,
} from "lucide-react"
import { SiteHeader } from "@/components/header"

interface Bin {
  _id: string
  binId: string
  title?: string
  content: string
  description?: string
  language: string
  views: number
  createdAt: string
  author?: {
    username: string
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Demo steps for the animated showcase
const demoSteps = [
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

export default function HomePage() {
  const [latestBins, setLatestBins] = useState<Bin[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDemoStep, setCurrentDemoStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    fetchLatestBins()
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentDemoStep((prev) => (prev + 1) % demoSteps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const fetchLatestBins = async () => {
    try {

      const params = new URLSearchParams({
        public: "true",
        limit: "5"
      })

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins?${params}`,
      )

      if (response.ok) {
        const data = await response.json()
        setLatestBins(data.bins)
      }
    } catch (error) {
      console.error("Failed to fetch latest bins:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`
    }

    const diffInYears = Math.floor(diffInMonths / 12)
    return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`
  }

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      javascript: "bg-yellow-100 text-yellow-800 border-yellow-200",
      typescript: "bg-blue-100 text-blue-800 border-blue-200",
      python: "bg-green-100 text-green-800 border-green-200",
      java: "bg-orange-100 text-orange-800 border-orange-200",
      cpp: "bg-purple-100 text-purple-800 border-purple-200",
      c: "bg-blue-100 text-blue-800 border-blue-200",
      csharp: "bg-violet-100 text-violet-800 border-violet-200",
      php: "bg-indigo-100 text-indigo-800 border-indigo-200",
      ruby: "bg-red-100 text-red-800 border-red-200",
      go: "bg-cyan-100 text-cyan-800 border-cyan-200",
      rust: "bg-orange-100 text-orange-800 border-orange-200",
      html: "bg-red-100 text-red-800 border-red-200",
      css: "bg-blue-100 text-blue-800 border-blue-200",
      markdown: "bg-gray-100 text-gray-800 border-gray-200",
    }

    return colors[language] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Navigation */}
      <SiteHeader showGradient={true} />

      {/* Hero Section with Demo */}
      <section className="min-h-screen flex items-center justify-center pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <motion.div
              className="text-center lg:text-left"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  The future of code sharing
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
              >
                Share code like
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  never before
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-12 leading-relaxed">
                CodeBinX is the modern way to share, store, and collaborate on code snippets. Beautiful, fast, and
                secure.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="/create">
                  <Button
                    size="lg"
                    className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-4 text-lg font-medium"
                  >
                    Start Creating
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/bins">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 py-4 text-lg font-medium border-gray-300"
                  >
                    Browse Bins
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right side - Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                {/* Demo Header */}
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

                {/* Step Indicator */}
                <div className="flex items-center space-x-2 mb-6">
                  {demoSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${index === currentDemoStep ? "bg-blue-500 w-8" : "bg-gray-200 w-2"
                        }`}
                    />
                  ))}
                </div>

                {/* Demo Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDemoStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="h-[400px] flex flex-col" // Add fixed height and flex layout
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{demoSteps[currentDemoStep].title}</h3>
                      <p className="text-gray-600 text-sm">{demoSteps[currentDemoStep].description}</p>
                    </div>

                    {/* Mock Editor */}
                    <div className="bg-gray-900 rounded-2xl overflow-hidden flex-1 flex flex-col">
                      {/* Editor Header */}
                      <div className="flex items-center space-x-2 p-4 bg-gray-800">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="ml-4 text-gray-400 text-sm">fibonacci.js</div>
                      </div>

                      {/* Editor Content */}
                      <div className="p-6 font-mono text-sm flex-1 relative">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        >
                          {demoSteps[currentDemoStep].code.split("\n").map((line, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="mb-1"
                            >
                              <span className="text-gray-500 mr-4 select-none">{index + 1}</span>
                              <span className="text-gray-300">
                                {line.includes("function") && (
                                  <>
                                    <span className="text-blue-400">function</span>
                                    <span className="text-yellow-400"> fibonacci</span>
                                    <span className="text-gray-300">(</span>
                                    <span className="text-orange-400">n</span>
                                    <span className="text-gray-300">) {`{`}</span>
                                  </>
                                )}
                                {line.includes("if") && (
                                  <>
                                    <span className="text-blue-400"> if</span>
                                    <span className="text-gray-300"> (</span>
                                    <span className="text-orange-400">n</span>
                                    <span className="text-gray-300"> &lt;= </span>
                                    <span className="text-green-400">1</span>
                                    <span className="text-gray-300">) </span>
                                    <span className="text-blue-400">return</span>
                                    <span className="text-orange-400"> n</span>
                                    <span className="text-gray-300">;</span>
                                  </>
                                )}
                                {line.includes("return fibonacci") && (
                                  <>
                                    <span className="text-blue-400"> return</span>
                                    <span className="text-yellow-400"> fibonacci</span>
                                    <span className="text-gray-300">(</span>
                                    <span className="text-orange-400">n</span>
                                    <span className="text-gray-300"> - </span>
                                    <span className="text-green-400">1</span>
                                    <span className="text-gray-300">) + </span>
                                    <span className="text-yellow-400">fibonacci</span>
                                    <span className="text-gray-300">(</span>
                                    <span className="text-orange-400">n</span>
                                    <span className="text-gray-300"> - </span>
                                    <span className="text-green-400">2</span>
                                    <span className="text-gray-300">);</span>
                                  </>
                                )}
                                {line === "}" && <span className="text-gray-300">{"}"}</span>}
                                {line.includes("console.log(fibonacci") && (
                                  <>
                                    <span className="text-gray-300"></span>
                                    <span className="text-blue-400">console</span>
                                    <span className="text-gray-300">.</span>
                                    <span className="text-yellow-400">log</span>
                                    <span className="text-gray-300">(</span>
                                    <span className="text-yellow-400">fibonacci</span>
                                    <span className="text-gray-300">(</span>
                                    <span className="text-green-400">10</span>
                                    <span className="text-gray-300">)); </span>
                                    <span className="text-gray-500">// 55</span>
                                  </>
                                )}
                                {line.includes('console.log("Shared') && (
                                  <>
                                    <span className="text-blue-400">console</span>
                                    <span className="text-gray-300">.</span>
                                    <span className="text-yellow-400">log</span>
                                    <span className="text-gray-300">(</span>
                                    <span className="text-green-400">"Shared on CodeBinX!"</span>
                                    <span className="text-gray-300">);</span>
                                  </>
                                )}
                                {!line.includes("function") &&
                                  !line.includes("if") &&
                                  !line.includes("return") &&
                                  !line.includes("console") &&
                                  line !== "}" &&
                                  line.trim() === "" && <span>&nbsp;</span>}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Demo Actions - positioned absolutely at bottom */}
                        {currentDemoStep === 2 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-4 left-6 right-6 p-3 bg-green-50 rounded-lg border border-green-200"
                          >
                            <div className="flex items-center space-x-2 text-green-800">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs font-medium">Bin created successfully!</span>
                            </div>
                            <div className="mt-1 text-xs text-green-700 font-mono">https://codebinx.com/bin/abc123</div>
                          </motion.div>
                        )}
                      </div>

                      {/* Status Bar */}
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

                {/* Manual Navigation */}
                <div className="flex justify-center space-x-2 mt-6">
                  {demoSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentDemoStep(index)
                        setIsPlaying(false)
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${index === currentDemoStep ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
              >
                <Code className="w-5 h-5" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-full shadow-lg"
              >
                <Share2 className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Bins Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Latest Public Bins</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Check out what the community is sharing right now</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeletons
              [...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-64 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-8"></div>
                  <div className="h-24 bg-gray-100 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </motion.div>
              ))
            ) : latestBins.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Code className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No bins found</h3>
                <p className="text-gray-600 mb-6">Be the first to share a bin!</p>
                <Link href="/create">
                  <Button className="bg-black hover:bg-gray-800 text-white rounded-xl">Create a Bin</Button>
                </Link>
              </div>
            ) : (
              latestBins.map((bin, index) => (
                <motion.div
                  key={bin._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/bin/${bin.binId}`}>
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200 border-0 shadow-sm rounded-2xl">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-medium text-lg text-gray-900 line-clamp-1">
                            {bin.title || `Untitled Bin`}
                          </h3>
                          <Badge className={`${getLanguageColor(bin.language)} ml-2 font-mono text-xs`}>
                            {bin.language}
                          </Badge>
                        </div>

                        {bin.description && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{bin.description}</p>
                        )}

                        <div className="bg-gray-50 rounded-lg p-4 mb-4 overflow-hidden relative">
                          <pre className="text-xs font-mono text-gray-800 line-clamp-3 overflow-hidden">
                            {bin.content}
                          </pre>
                          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-gray-50 to-transparent"></div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              <span>{bin.views}</span>
                            </div>

                            {bin.author && (
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                <span>{bin.author.username}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{formatTimeAgo(bin.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/bins">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-4 text-lg font-medium border-gray-300"
              >
                Browse All Bins
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">How it works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to share your code with the world
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {[
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
            ].map((item, index) => (
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
                <div className="text-sm font-semibold text-gray-500 mb-4 tracking-wider">STEP {item.step}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Built for developers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every feature designed with the modern developer workflow in mind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((feature, index) => (
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Ready to start sharing?</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join thousands of developers who trust CodeBinX for their code sharing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-4 text-lg font-medium"
                >
                  Create Free Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/create">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 py-4 text-lg font-medium border-gray-300"
                >
                  Try Without Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">CodeBinX</span>
              </div>
              <p className="text-gray-400 leading-relaxed">The modern way to share and collaborate on code snippets.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/create" className="hover:text-white transition-colors">
                    Create Bin
                  </Link>
                </li>
                <li>
                  <Link href="/bins" className="hover:text-white transition-colors">
                    Browse Bins
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white transition-colors">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-white transition-colors">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white transition-colors">
                    API Docs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CodeBinX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
