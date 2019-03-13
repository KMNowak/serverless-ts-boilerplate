import { JoiObject } from 'joi'
import { combinedMiddyFactory } from 'lib/middlewares'
import { withDB } from 'lib/hof'
import { AWSTypes } from 'lib/types'

type Lambda<Q = {}, B = {}> = AWSTypes.Lambda<Q, B>
type Handler<Q = {}, B = {}> = AWSTypes.Handler<Q, B>

export const handlerWrapper = <Q = {}, B = {}>(lambda: Lambda<Q, B>, validationSchema?: JoiObject, shouldConnectDB: boolean = true) =>
    combinedMiddyFactory<Handler<Q, B>>(withDB(lambda), validationSchema, shouldConnectDB)
