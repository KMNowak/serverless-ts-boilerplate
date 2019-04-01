import { Transaction } from 'knex'
import { HttpError } from 'lib/utils'
import { CustomErrorCodes } from 'lib/types'
import { Sample as Types } from 'lib/operations/types'
import { sampleTable } from 'lib/models/mySQLTables'
import { OperationsBase } from './OperationsBase'

export class SampleOperations extends OperationsBase {
    constructor(transaction: Transaction) {
        super(transaction)
    }

    getSampleIdByUUID(sampleUUID: string) {
        return this.transaction(sampleTable.name)
            .select(
                sampleTable.columns.sampleId
            )
            .where({
                [sampleTable.columns.sampleUUID]: sampleUUID
            })
            .limit(1)
            .then(([sample]: Array<Types.GetSampleByUUIDResponse>) => {
                if (!sample) {
                    throw new HttpError().NotFound(CustomErrorCodes.SomethingNotFound, { notFoundUUID: sampleUUID })
                }

                return sample.sampleId
            })
    }
}
