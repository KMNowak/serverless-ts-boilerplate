import { Transaction } from 'knex'
import { OperationsBase } from './OperationsBase'

export class SampleOperations extends OperationsBase {
    constructor(transaction: Transaction) {
        super(transaction)
    }

    sampleGetResponse(sampleUUID: string, anotherKey?: string) {
        return {
            sampleUUID,
            anotherKey
        }
    }
}
