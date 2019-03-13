import joi from 'joi'
import { joiCommon } from 'lib/common'

export const sampleGetSchema = joi.object({
    someUUUID: joiCommon.uuidV4.required(),
    anotherKey: joi.string().optional()
})
