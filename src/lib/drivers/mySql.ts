import knex from 'knex'
import { mySqlDBConfig } from 'lib/config'

export const mySqlDBClientInit = () => knex(mySqlDBConfig)
