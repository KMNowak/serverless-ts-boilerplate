import { Config } from 'knex'
import { ENVS, STAGES } from 'lib/common'

const MY_SQL_CLIENTS = {
    MySQL2: 'mysql2'
}

const isDev = String(ENVS.STAGE).toLowerCase() === String(STAGES.DEV).toLowerCase()

const mySqlDBConfig: Config = {
    client: MY_SQL_CLIENTS.MySQL2,
    version: ENVS.MY_SQL_VERSION,
    connection: {
        host: ENVS.MY_SQL_HOST,
        user: ENVS.MY_SQL_USER,
        password: ENVS.MY_SQL_PASSWORD,
        database: ENVS.MY_SQL_DATABASE
    },
    pool: {
        min: 0,
        max: 1
    },
    asyncStackTraces: isDev,
    debug: isDev
}

export {
    mySqlDBConfig
}
