import { successfulResponseWrapper, errorResponseWrapper, HttpError } from 'lib/utils'
import { AWSTypes } from 'lib/types'

type WithDB = <Q = {}, B = {}> (lambdaLogic: AWSTypes.LambdaLogic<Q, B>) => AWSTypes.Handler<Q, B>

export const withDB: WithDB = lambdaLogic => async event => {
    try {
        // in case lambda has plain logic without connection to DB
        if (!event.dbClient) {
            const result = await lambdaLogic(event)

            return successfulResponseWrapper(result)
        }

        const result = await event.dbClient.transaction(async transaction => {
            const extendedEvent = {
                ...event,
                transaction
            }

            return lambdaLogic(extendedEvent)
        })

        return successfulResponseWrapper(result)
    } catch (err) {
        if (err instanceof HttpError) {
            return errorResponseWrapper(err)
        }
        // tslint:disable-next-line no-console
        console.log('[ERROR]: Internal error', err)

        const httpError = new HttpError()

        return errorResponseWrapper(httpError)
    } finally {
        if (event.dbClient) {
            await event.dbClient.destroy()
        }
    }
}
