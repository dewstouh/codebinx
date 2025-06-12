// Shoutout to GPT for creating the Zod adapter for Nuqs with debouncing

import {
    useQueryState,
    parseAsString,
    parseAsInteger,
    parseAsBoolean,
    type Options as BaseOptions
} from 'nuqs'
import { useDebouncedCallback } from 'use-debounce'
import { useEffect, useState } from 'react'
import { z } from 'zod'

type Options = BaseOptions & {
    delay?: number
    resetKeys?: string[]
}

export function useSafeQueryStateFromZod<S extends z.ZodTypeAny>(
    key: string,
    schema: S,
    options?: Options
): [
        z.infer<S>,
        (value: z.infer<S>) => void
    ] {
    let baseSchema = schema
    let defaultValue: any = undefined

    if (schema._def.typeName === 'ZodDefault') {
        defaultValue = schema._def.defaultValue()
        baseSchema = schema._def.innerType
    }

    const typeName = baseSchema._def.typeName

    let parser: any

    switch (typeName) {
        case 'ZodString':
        case 'ZodEnum':
        case 'ZodNativeEnum':
        case 'ZodLiteral':
        case 'ZodUnion':
            parser = parseAsString.withDefault(defaultValue)
            break
        case 'ZodNumber':
            parser = parseAsInteger.withDefault(defaultValue)
            break
        case 'ZodBoolean':
            parser = parseAsBoolean.withDefault(defaultValue)
            break
        case 'ZodEffects':
            if (baseSchema._def.schema?._def?.typeName === 'ZodNumber') {
                parser = parseAsInteger.withDefault(defaultValue)
            } else {
                parser = parseAsString.withDefault(defaultValue)
            }
            break
        default:
    }

    const [rawValue, setRaw] = useQueryState<z.infer<S>>(key, {
        ...parser,
        ...options
    })
    const delay = options?.delay
    const resetKeys = options?.resetKeys ?? []

    if (!delay) return [rawValue ?? defaultValue, setRaw]

    // Si hay delay: debounce
    const [internalValue, setInternalValue] = useState<z.infer<S> | null>(rawValue)

    const debouncedSet = useDebouncedCallback((v: z.infer<S> | null) => {
        setRaw(v)

        for (const rk of resetKeys) {
            const [, resetSetter] = useQueryState(rk, parseAsString.withDefault(''))
            resetSetter(null)
        }
    }, delay)

    const set = (v: z.infer<S> | null) => {
        setInternalValue(v)
        debouncedSet(v)
    }

    useEffect(() => {
        setInternalValue(rawValue)
    }, [rawValue])

    return [internalValue ?? defaultValue as z.infer<S>, set]
}
