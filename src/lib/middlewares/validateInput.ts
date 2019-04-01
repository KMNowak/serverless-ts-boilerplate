import joi, { JoiObject } from 'joi'
import { NextFunction, HandlerLambda } from 'middy'
import { HttpError, R } from 'lib/utils'
import { AWSTypes, ResponsesTypes } from 'lib/types'

export const validateInput = <Q = {}, B = {}>(validationSchema: JoiObject) => ({
    before: (handler: HandlerLambda<AWSTypes.Event<Q, B>, ResponsesTypes.LambdaResponse>, next: NextFunction) => {
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
            ? handler.event.body = value as B
            : handler.event.queryStringParameters = value as Q

        return next()
    },
    onError: (_: HandlerLambda, next: NextFunction) => {
        return next()
    }
})
