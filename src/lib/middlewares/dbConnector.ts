import { NextFunction, HandlerLambda } from 'middy'
import { AWSTypes, ResponsesTypes } from 'lib/types'
import { mySqlDBClientInit } from 'lib/drivers'

export const dbConnector = <Q = {}, B = {}>() => ({
    before: (handler: HandlerLambda<AWSTypes.Event<Q, B>, ResponsesTypes.FullMiddlewareResponse>, next: NextFunction) => {
        handler.event.dbClient = mySqlDBClientInit()

        return next()
    }
})
