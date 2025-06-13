import { NextResponse } from "next/server"

type Meta = Record<string, any>

type Payload = {
    status: number
    message?: string
    error?: string
    data?: unknown
    meta?: Meta
}

export default class APIResponse {
    private payload: Payload

    constructor() {
        this.payload = { status: 200, data: {} }
    }

    status(code:number){
        this.payload.status = code
        return this
    }

    message(msg: string) {
        this.payload.message = msg
        return this
    }

    errorKey(key: string) {
        this.payload.error = key
        return this
    }

    meta(meta: Meta) {
        this.payload.meta = meta
        return this
    }

    paginate(total: number, page: number, limit: number) {
        const totalPages = Math.ceil(total / limit)
        const hasNextPage = page < totalPages

        this.payload.meta = {
            ...(this.payload.meta || {}),
            pagination: { total, page, limit, totalPages, hasNextPage },
        }

        return this
    }

    json(data?: unknown) {
        if (data !== undefined) this.payload.data = data

        return NextResponse.json(this.payload, {
            status: this.payload.status,
        })
    }

    success(data?: unknown) {
        return this.json(data)
    }

    error(data?: unknown) {
        return this.json(data)
    }
}
