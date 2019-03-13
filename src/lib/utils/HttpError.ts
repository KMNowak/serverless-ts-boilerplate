import httpStatusCodes, { getStatusText } from 'http-status-codes'
import { CustomErrorCodes } from 'lib/types'

export class HttpError {
    public statusCode: number
    public message: string
    public payload: {}
    public customErrorCode?: CustomErrorCodes

    constructor() {
        this.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR
        this.message = getStatusText(this.statusCode)
        this.payload = {}
    }

    public BadRequest(customErrorCode?: CustomErrorCodes, payload: {} = {}) {
        return this.createError(httpStatusCodes.BAD_REQUEST, customErrorCode, payload)
    }

    public Unauthorized(customErrorCode?: CustomErrorCodes, payload: {} = {}) {
        return this.createError(httpStatusCodes.UNAUTHORIZED, customErrorCode, payload)
    }

    public Forbidden(customErrorCode?: CustomErrorCodes, payload: {} = {}) {
        return this.createError(httpStatusCodes.FORBIDDEN, customErrorCode, payload)
    }

    public NotFound(customErrorCode?: CustomErrorCodes, payload: {} = {}) {
        return this.createError(httpStatusCodes.NOT_FOUND, customErrorCode, payload)
    }

    public MethodNotAllowed(customErrorCode?: CustomErrorCodes, payload: {} = {}) {
        return this.createError(httpStatusCodes.METHOD_NOT_ALLOWED, customErrorCode, payload)
    }

    public NotAcceptable(customErrorCode?: CustomErrorCodes, payload: {} = {}) {
        return this.createError(httpStatusCodes.NOT_ACCEPTABLE, customErrorCode, payload)
    }

    public RequestTimeout(customErrorCode?: CustomErrorCodes, payload: {} = {}) {
        return this.createError(httpStatusCodes.REQUEST_TIMEOUT, customErrorCode, payload)
    }

    public Conflict(customErrorCode?: CustomErrorCodes, payload: {} = {}) {
        return this.createError(httpStatusCodes.CONFLICT, customErrorCode, payload)
    }

    public Gone(customErrorCode?: CustomErrorCodes, payload: {} = {}) {
        return this.createError(httpStatusCodes.GONE, customErrorCode, payload)
    }

    public TooManyRequests(customErrorCode?: CustomErrorCodes, payload: {} = {}) {
        return this.createError(httpStatusCodes.TOO_MANY_REQUESTS, customErrorCode, payload)
    }

    public InternalServerError(customErrorCode?: CustomErrorCodes, payload: {} = {}) {
        return this.createError(httpStatusCodes.INTERNAL_SERVER_ERROR, customErrorCode, payload)
    }

    private createError(statusCode: number, customErrorCode?: CustomErrorCodes, payload: {} = {}) {
        this.statusCode = statusCode
        this.message = getStatusText(statusCode)
        this.payload = payload
        this.customErrorCode = customErrorCode

        return this
    }
}
