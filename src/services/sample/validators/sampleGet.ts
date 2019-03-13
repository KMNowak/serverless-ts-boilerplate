import joi from 'joi'
import { joiCommon } from 'lib/common'

export const sampleGetSchema = joi.object({
    sampleUUID: joiCommon.uuidV4.required()
})
