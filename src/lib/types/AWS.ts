import knex, { Transaction } from 'knex'
import { Context, Callback } from 'aws-lambda'
import { ResponsesTypes, KeyValuePair } from 'lib/types'

export type Event<Q = KeyValuePair, B = KeyValuePair> = {
    headers: {
        Authorization: string
    }
    queryStringParameters: Q,
    body: B,
    dbClient?: knex,
    transaction?: Transaction
}

// tslint:disable-next-line no-any
export type HandlerLogic<Q = {}, B = {}> = (event: Event<Q, B>, context?: Context, callback?: Callback) => Promise<any>
export type Handler<Q = {}, B = {}> = (event: Event<Q, B>, context?: Context, callback?: Callback) => Promise<ResponsesTypes.LambdaResponse>
