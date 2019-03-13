import { InKeyOfObject } from 'lib/types'
import { DBTableBase } from './DBTableBase'
import { SampleFieldsTypes } from '../types'

const tableName = 'sample'
const sampleColumns: InKeyOfObject<SampleFieldsTypes> = {
    sampleId: 'sampleId',
    sampleUUID: 'sampleUUID'
}

export const sampleTable = new DBTableBase<typeof sampleColumns>(tableName, sampleColumns)
