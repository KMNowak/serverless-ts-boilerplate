import { HexBase64Latin1Encoding } from 'crypto'

export const STAGES = {
    DEV: 'dev',
    PROD: 'prod'
}

export const CRYPTO = {
    SHA256: 'sha256',
    HEX: 'hex' as HexBase64Latin1Encoding
}

export const AWS_CONSTANTS = {
    COGNITO_IDENTITY_SERVICE_PROVIDER: {
        AUTH_FLOW: {
            REFRESH_TOKEN: 'REFRESH_TOKEN'
        }
    }
}

export const SQL_CONSTANTS = {
    ORDER_BY: {
        ASC: 'ASC',
        DESC: 'DESC'
    },
    LIKE: 'LIKE'
}
