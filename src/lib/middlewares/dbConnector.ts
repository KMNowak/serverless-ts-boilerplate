import { NextFunction, HandlerLambda } from 'middy'
import { AWSTypes, ResponsesTypes } from 'lib/types'
import { mySqlDBClientInit } from 'lib/drivers'

export const dbConnector = () => ({
    before: (handler: HandlerLambda<AWSTypes.Event, ResponsesTypes.FullMiddlewareResponse>, next: NextFunction) => {
        handler.event.dbClient = mySqlDBClientInit()

        return next()
    }
})
