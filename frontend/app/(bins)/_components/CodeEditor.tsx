"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardHeader } from "@/components/ui/card"
import Editor from "@monaco-editor/react"
import { Code } from "lucide-react"
import { languages } from "@codebinx/shared"
import { Loading } from "@/app/_components/Loading"
import LoadingEditor from "./LoadingEditor"

interface Props {
    formData: any
    handleEditorChange: (val: string | undefined) => void
    handleEditorDidMount: () => void
    editorLoading: boolean
}

export const CodeEditor = ({ formData, handleEditorChange, handleEditorDidMount, editorLoading }: Props) => (
    <Card className="shadow-lg border-0 rounded-2xl overflow-hidden lg:col-span-2">
        <CardHeader className="bg-gray-800 text-white p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-sm font-medium">
                        {formData.title || "untitled"}.
                        {Object.keys(languages).find((l) => l === formData.language) || "txt"}
                    </span>
                </div>
                <Badge variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                    {formData.language}
                </Badge>
            </div>
        </CardHeader>

        <div className="h-[600px] w-full relative">
            {editorLoading && (
                <LoadingEditor/>
            )}
            <Editor
                height="100%"
                language={formData.language}
                value={formData.content}
                theme="vs-dark"
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 20, bottom: 20 },
                    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
                    lineHeight: 1.6,
                    letterSpacing: 0.5,
                    renderWhitespace: "selection",
                    bracketPairColorization: { enabled: true },
                    guides: {
                        bracketPairs: true,
                        indentation: true,
                    },
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                    wordBasedSuggestions: true,
                }}
            />
        </div>

        <div className="bg-blue-600 text-white px-4 py-1 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <span>Ln 1, Col 1</span>
                <span>UTF-8</span>
                <span className="capitalize">{formData.language}</span>
            </div>
            <div className="flex items-center space-x-4">
                <span>CodeBinX Editor</span>
            </div>
        </div>
    </Card>
)
