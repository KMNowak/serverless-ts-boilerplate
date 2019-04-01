import { JoiObject } from 'joi'
import { combinedMiddyFactory } from 'lib/middlewares'
import { withDB } from 'lib/hof'
import { AWSTypes } from 'lib/types'

export const handlerWrapper = <Q = {}, B = {}>(lambda: AWSTypes.LambdaLogic<Q, B>, validationSchema?: JoiObject, shouldConnectDB: boolean = true) =>
    combinedMiddyFactory<Q, B>(withDB(lambda), validationSchema, shouldConnectDB)
