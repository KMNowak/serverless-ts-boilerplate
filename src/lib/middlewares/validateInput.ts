import joi, { JoiObject } from 'joi'
import { NextFunction, HandlerLambda } from 'middy'
import { HttpError, R } from 'lib/utils'
import { AWSTypes, ResponsesTypes } from 'lib/types'

export const validateInput = <E extends AWSTypes.Event, R = ResponsesTypes.LambdaResponse>(validationSchema: JoiObject) => ({
    before: (handler: HandlerLambda<E, R>, next: NextFunction) => {
        const { body, queryStringParameters } = handler.event
        const hasBody = !R.isNilOrEmpty(body)
        const objToValidate = hasBody
            ? body
            : queryStringParameters
        const { error, value } = joi.validate(objToValidate, validationSchema)

        if (error) {
            // tslint:disable-next-line no-console
            console.log('[ERROR]: validate error', error)

            throw new HttpError().BadRequest()
        }

        hasBody
            ? handler.event.body = value
            : handler.event.queryStringParameters = value

        return next()
    },
    onError: (_: HandlerLambda<E, R>, next: NextFunction) => {
        return next()
    }
})
