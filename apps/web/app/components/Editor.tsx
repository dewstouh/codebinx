'use client'

import { useRef, useCallback } from 'react'
import MonacoEditor from '@monaco-editor/react';
import { Language } from '@/types/language';

interface EditorProps {
    value?: string
    language?: string
    onChange?: (value: string) => void
    height?: string,
    readonly?: boolean
}

export default function Editor({ value = "", language = Language.javascript, onChange, height = '100%', readonly = false }: EditorProps) {

    const editorRef = useRef(null);

    const handleEditorDidMount = (editor: null) => {
        editorRef.current = editor;
    }

    const handleChange = useCallback((value: string | undefined) => {
        if (onChange && value !== undefined) {
            onChange(value);
        }
    }, [onChange]);

    return (
        <MonacoEditor
            value={value}
            onChange={handleChange}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            height={height}
            language={language}
            options={{
                minimap: { enabled: false },
                scrollbar: { vertical: 'auto', horizontal: 'auto' },
                fontSize: 16,
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                folding: true,
                readOnly: readonly
            }}
        />
    )
}
