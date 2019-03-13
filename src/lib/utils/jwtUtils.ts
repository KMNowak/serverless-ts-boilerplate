import jwtDecode from 'jwt-decode'
import { JWTDecodedAccessToken } from 'lib/types'
import { HttpError } from './HttpError'

export const getCognitoUserPoolSubFromAccessToken = (token: string) => {
    try {
        const { sub } = jwtDecode(token) as JWTDecodedAccessToken

        return sub
    }
    catch (error) {
        throw new HttpError().Forbidden()
    }
}
