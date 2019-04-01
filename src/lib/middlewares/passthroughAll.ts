import { NextFunction, HandlerLambda } from 'middy'

export const passthroughAll = () => ({
      before: (_: HandlerLambda, next: NextFunction) => next(),
      after: (_: HandlerLambda, next: NextFunction) => next(),
      onError: (_: HandlerLambda, next: NextFunction) => next()
})
