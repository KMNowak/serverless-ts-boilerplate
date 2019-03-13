import { HttpError } from 'lib/utils'

export type LambdaResponse<P = {}> = {
    statusCode?: number,
    message?: string
    payload?: P,
    error?: HttpError | Error
}

export type FullMiddlewareResponse<H = {}, T = {}> = {
    headers?: H,
    body?: string,
    statusCode: number,
    message?: string,
    payload?: T,
    isBase64Encoded?: boolean,
    error?: HttpError | Error
}
