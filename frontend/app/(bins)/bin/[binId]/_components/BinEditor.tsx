"use client"

import { Editor } from "@monaco-editor/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/header"
import { Eye, Calendar, User, Lock, Share2, Download, Copy, CheckCircle, Maximize2, ArrowLeft } from "lucide-react"
import { useBinActions } from "../_hooks/useBinActions"
import type { IBinResponse } from "@codebinx/shared"
import LoadingEditor from "@/app/(bins)/_components/LoadingEditor"

export default function BinEditor({ bin }: { bin: IBinResponse }) {
    const {
        copied,
        isFullscreen,
        editorLoading,
        copyToClipboard,
        copyUrl,
        downloadBin,
        toggleFullscreen,
        setEditorLoading
    } = useBinActions(bin)

    return (
        <div className={`min-h-screen bg-gray-50 ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
            {!isFullscreen && <SiteHeader />}

            <div className={`${isFullscreen ? "h-screen" : "min-h-screen"} flex flex-col`}>
                {!isFullscreen && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <Eye className="w-4 h-4" />
                                        <span>{bin.views} views</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(bin.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    {bin.author && (
                                        <div className="flex items-center space-x-2">
                                            <User className="w-4 h-4" />
                                            <span>by {bin.author.username}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Badge variant={bin.isPrivate ? "destructive" : "secondary"} className="rounded-lg">
                                        {bin.isPrivate ? "Private" : "Public"}
                                    </Badge>
                                    <Badge variant="outline" className="rounded-lg font-mono">{bin.language}</Badge>
                                    {bin.hasPassword && (
                                        <Badge variant="outline" className="rounded-lg">
                                            <Lock className="w-3 h-3 mr-1" />
                                            Protected
                                        </Badge>
                                    )}
                                    <Button variant="outline" size="sm" onClick={copyUrl} className="rounded-lg">
                                        {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
                                        Share
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={downloadBin} className="rounded-lg">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </div>
                            </div>

                            {bin.description && <p className="text-gray-600 mt-2">{bin.description}</p>}
                        </div>
                    </motion.div>
                )}

                <div className="flex-1 relative">
                    <div className="bg-gray-800 border-b border-gray-700">
                        <div className="flex items-center">
                            <div className="bg-gray-700 px-4 py-2 text-white text-sm font-medium border-r border-gray-600 flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span>{bin.title || bin.binId}</span>
                            </div>
                            <div className="flex-1"></div>
                            <div className="flex items-center space-x-2 px-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={copyToClipboard}
                                    className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                                >
                                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={toggleFullscreen}
                                    className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                                >
                                    <Maximize2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={`${isFullscreen ? "h-full" : "h-[calc(100vh-200px)]"} w-full relative`}>
                        {editorLoading && (
                            <LoadingEditor/>
                        )}
                        <Editor
                            height="100%"
                            language={bin.language}
                            value={bin.content}
                            theme="vs-dark"
                            onMount={() => setEditorLoading(false)}
                            options={{
                                readOnly: true,
                                minimap: { enabled: true },
                                fontSize: 14,
                                lineNumbers: "on",
                                automaticLayout: true,
                                padding: { top: 20, bottom: 20 },
                                fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                                lineHeight: 1.6,
                                letterSpacing: 0.5,
                                renderWhitespace: "selection",
                                bracketPairColorization: { enabled: true },
                                guides: {
                                    bracketPairs: true,
                                    indentation: true,
                                },
                            }}
                        />
                    </div>

                    <div className="bg-blue-600 text-white px-4 py-1 text-xs flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span>Ln 1, Col 1</span>
                            <span>UTF-8</span>
                            <span className="capitalize">{bin.language}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span>Read-only</span>
                            <span>CodeBinX</span>
                        </div>
                    </div>
                </div>
            </div>

            {isFullscreen && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={toggleFullscreen}
                    className="fixed top-4 right-4 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </motion.button>
            )}
        </div>
    )
}
