import { SampleOperations } from 'lib/operations'
import { handlerWrapper } from 'lib/utils'
import { AWSTypes } from 'lib/types'
import { sampleGetSchema } from './validators'

export type Query = {
    sampleUUID: string
}

export const lambda: AWSTypes.HandlerLogic<Query> = async event => {
    const { transaction, queryStringParameters } = event
    const { sampleUUID } = queryStringParameters

    const sampleOperations = new SampleOperations(transaction)

    const id = await sampleOperations.getSampleIdByUUID(sampleUUID)

    return {
        id
    }
}

export const handler = handlerWrapper<Query>(lambda, sampleGetSchema)
