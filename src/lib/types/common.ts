import { SortOrder } from './db'

// tslint:disable no-any

export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type InKeyOfObject<O, V = any> = { [P in keyof O]: V }

export type JWTDecodedAccessToken = {
    iss: string,
    client_id: string,
    username: string,
    sub: string,
    token_use: string
}

export type ObjectWithNullableProps<O extends {}> = {
    [K in keyof O]: Nullable<O[K]>
}

export type ObjectWithNonNullableProps<O extends {}> = {
    [K in keyof O]: NonNullable<O[K]>
}

export type KeyValuePair<T = any> = {
    [key: string]: T
}

export type FlatPick<T, K extends keyof T> = T[K]

export type Tuple<K = string, V = any> = [K, V]

export interface Order<T = string> {
    orderWay?: SortOrder,
    orderBy?: T
}

// tslint:enable no-any
