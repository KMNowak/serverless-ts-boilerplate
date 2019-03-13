// tslint:disable no-any

export type Nullable<T> = T | null
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

// tslint:enable no-any
