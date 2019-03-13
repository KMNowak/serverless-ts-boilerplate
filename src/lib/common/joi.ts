import joi from 'joi'
import { DEFAULT_PAGING_CONFIG } from 'lib/operations/configs'

export const joiCommon = {
    uuidV4: joi.string().guid({
        version: 'uuidv4'
    }),
    offset: joi.number().min(0),
    limit: joi.number().min(0).max(DEFAULT_PAGING_CONFIG.limit)
}
