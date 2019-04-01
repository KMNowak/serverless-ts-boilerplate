import middy from 'middy'
import middyMiddlewareWarmup from 'middy-middleware-warmup'
import { JoiObject } from 'joi'
import { jsonBodyParser, doNotWaitForEmptyEventLoop, cors, httpEventNormalizer } from 'middy/middlewares'
import { AWSTypes } from 'lib/types'
import { dbConnector } from './dbConnector'
import { MIDDLEWARE_DEF_CONFIG } from './constants'
import { proxyResponse } from './proxyResponse'
import { validateInput } from './validateInput'
import { passthroughAll } from './passthroughAll'

export const combinedMiddyFactory = <Q = {}, B = {}>(lambda: AWSTypes.LambdaLogic<Q, B>, validationSchema?: JoiObject, shouldConnectDB: boolean = true) =>
    middy(lambda)
        .use(middyMiddlewareWarmup())
        .use(httpEventNormalizer())
        .use(jsonBodyParser())
        .use(validationSchema ? validateInput<Q, B>(validationSchema) : passthroughAll())
        .use(shouldConnectDB ? dbConnector<Q, B>() : passthroughAll())
        .use(doNotWaitForEmptyEventLoop(MIDDLEWARE_DEF_CONFIG.DO_NOT_WAIT_FOR_EMPTY_EVENT_LOOP))
        .use(cors(MIDDLEWARE_DEF_CONFIG.CORS))
        .use(proxyResponse<Q, B>())
