import { SampleOperations } from 'lib/operations'
import { handlerWrapper } from 'lib/utils'
import { AWSTypes } from 'lib/types'
import { sampleGetSchema } from './validators'

type Query = {
    sampleUUID: string
}

const lambda: AWSTypes.LambdaLogic<Query> = async event => {
    const { transaction, queryStringParameters } = event
    const { sampleUUID } = queryStringParameters

    const sampleOperations = new SampleOperations(transaction)
    // todo: add jest tests

    return sampleOperations.getSampleIdByUUID(sampleUUID)
}

export const handler = handlerWrapper<Query>(lambda, sampleGetSchema)
