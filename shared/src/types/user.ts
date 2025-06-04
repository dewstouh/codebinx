import { Document } from "mongoose"

export interface BaseUser {
    username: string
    email: string
    avatar?: string
    isVerified: boolean
    createdAt: Date
}

export interface IUser extends Document, BaseUser {
    _id: string
    password?: string
    googleId?: string
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

export interface IUserResponse extends BaseUser {
    id: string // mapeado desde _id
}

export interface IUserAuthData {
    user: IUserResponse
    token: string
}

export interface IUserStats {
    totalBins: number
    totalViews: number
    privateBins: number
    publicBins: number
}
