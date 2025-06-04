import { Document } from "mongoose"
import { extensions } from "../constants";

export type BinExtensionType = (typeof extensions)[BinLanguageType]

export type BinLanguageType = keyof typeof extensions;

export interface BaseBin {
    binId: string
    title: string
    description?: string
    content: string
    language: BinLanguageType
    isPrivate: boolean
    views: number
    expiresAt?: Date
    createdAt: Date
    updatedAt: Date
}

export interface IBin extends Document, BaseBin {
    _id: string
    password?: string
    author?: string
    comparePassword(candidatePassword: string): Promise<boolean>
}

export interface IBinResponse extends BaseBin {
    id: string // diferente de _id
    hasPassword: boolean
    author?: {
        id: string
        username: string
        avatar?: string
    }
}


