import { JoiObject } from 'joi'
import { combinedMiddyFactory } from 'lib/middlewares'
import { withDB } from 'lib/hof'
import { AWSTypes } from 'lib/types'

type HandlerLogic<Q = {}, B = {}> = AWSTypes.HandlerLogic<Q, B>
type Handler<Q = {}, B = {}> = AWSTypes.Handler<Q, B>

export const handlerWrapper = <Q = {}, B = {}>(handlerLogic: HandlerLogic<Q, B>, validationSchema?: JoiObject, shouldConnectDB: boolean = true) =>
    combinedMiddyFactory<Handler<Q, B>>(withDB(handlerLogic), validationSchema, shouldConnectDB)