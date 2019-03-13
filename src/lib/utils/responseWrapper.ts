import httpStatusCodes, { getStatusText } from 'http-status-codes'
import { HttpError } from 'lib/utils'
import { ResponsesTypes } from 'lib/types'

export const responseWrapper = (statusCode: number, error: HttpError, payload: {} = {}): ResponsesTypes.LambdaResponse => ({
    statusCode,
    message: getStatusText(statusCode),
    payload,
    error
})

export const simpleErrorResponseWrapper = (statusCode: number): ResponsesTypes.LambdaResponse => ({
    statusCode,
    message: getStatusText(statusCode)
})

export const errorResponseWrapper = (error: HttpError): ResponsesTypes.LambdaResponse => ({
    // error goes to handler.response.error to proceed with proxyResponse middleware
    error
})

export const successfulResponseWrapper = (payload: {} = {}): ResponsesTypes.LambdaResponse => {
    const okCode = httpStatusCodes.OK
    const message = getStatusText(okCode)

    return {
        statusCode: okCode,
        message,
        payload
    }
}
