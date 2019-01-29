import { Handler, APIGatewayEvent } from 'aws-lambda'

const validLoginData = {
    email: 'store-test@skanerka.pl',
    password: 'Test1234'
}
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store,no-cache'
}

export const handler: Handler = async (event: APIGatewayEvent) => {
    const { email, password } = JSON.parse(event.body)

    if (email === validLoginData.email && password === validLoginData.password) {
        const AccessTokenMock = 'allow'
        const RefreshTokenMock = 'refresh'

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                payload: {
                    AccessToken: AccessTokenMock,
                    RefreshToken: RefreshTokenMock
                }
            })
        }
    }

    return {
        statusCode: 403,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            message: 'Forbidden',
            payload: {}
        })
    }

}