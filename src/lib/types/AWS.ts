import knex, { Transaction } from 'knex'
import { Context, Callback } from 'aws-lambda'
import { ResponsesTypes } from 'lib/types'

export type Event<Q = {}, B = {}> = {
    headers: {
        Authorization: string
    }
    queryStringParameters: Q,
    body: B,
    dbClient?: knex,
    transaction: Transaction
}

// tslint:disable-next-line no-any
export type LambdaLogic<Q = {}, B = {}> = (event: Event<Q, B>, context?: Context, callback?: Callback) => Promise<any>
export type Handler<Q = {}, B = {}> = (event: Event<Q, B>, context?: Context, callback?: Callback) => Promise<ResponsesTypes.LambdaResponse>
