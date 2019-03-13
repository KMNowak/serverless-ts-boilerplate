import { NextFunction, HandlerLambda } from 'middy'
import { ResponsesTypes, AWSTypes } from 'lib/types'

export const passthroughAll = <E extends AWSTypes.Event, R = ResponsesTypes.LambdaResponse>() => ({
      before: (_: HandlerLambda<E, R>, next: NextFunction) => next(),
      after: (_: HandlerLambda<E, R>, next: NextFunction) => next(),
      onError: (_: HandlerLambda<E, R>, next: NextFunction) => next()
})
