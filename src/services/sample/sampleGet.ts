import { SampleOperations } from 'lib/operations'
import { handlerWrapper } from 'lib/utils'
import { AWSTypes } from 'lib/types'
import { sampleGetSchema } from './validators'

type Query = {
    sampleUUID: string,
    anotherKey?: string
}

const lambda: AWSTypes.HandlerLogic<Query> = async event => {
    const { transaction, queryStringParameters } = event
    const { sampleUUID, anotherKey } = queryStringParameters

    const sampleOperations = new SampleOperations(transaction)

    return sampleOperations.sampleGetResponse(sampleUUID, anotherKey)
}

export const handler = handlerWrapper<Query>(lambda, sampleGetSchema)
