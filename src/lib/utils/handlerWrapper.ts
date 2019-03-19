import { JoiObject } from 'joi'
import { combinedMiddyFactory } from 'lib/middlewares'
import { withDB } from 'lib/hof'
import { AWSTypes, KeyValuePair } from 'lib/types'

type HandlerLogic<Q = KeyValuePair, B = KeyValuePair> = AWSTypes.HandlerLogic<Q, B>
type Handler<Q = KeyValuePair, B = KeyValuePair> = AWSTypes.Handler<Q, B>

export const handlerWrapper = async <Q = KeyValuePair, B = KeyValuePair>(handlerLogic: HandlerLogic<Q, B>, validationSchema?: JoiObject, shouldConnectDB: boolean = true) =>
    combinedMiddyFactory<Handler<Q, B>>(await withDB(handlerLogic), validationSchema, shouldConnectDB)
