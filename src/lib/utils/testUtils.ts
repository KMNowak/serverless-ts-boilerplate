import knex from 'knex'
import { KeyValuePair } from 'lib/types'

type ProxyIntegrationEventGeneratorProps<Q = KeyValuePair, B = KeyValuePair> = {
    httpMethod: string,
    Authorization: string,
    dbClient: knex,
    queryStringParameters?: Q,
    body?: B,
    multiValueQueryStringParameters?: KeyValuePair
}

export const proxyIntegrationEventGenerator = <Q = KeyValuePair, B = KeyValuePair> (props: ProxyIntegrationEventGeneratorProps<Q, B>) => {
    const {
        httpMethod,
        Authorization,
        dbClient,
        multiValueQueryStringParameters = null,
        body = null,
        queryStringParameters = null
    } = props

    return {
        dbClient,
        queryStringParameters,
        resource: '/{proxy+}',
        path: '/mock',
        httpMethod,
        headers: {
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'cache-control': 'no-cache',
            'CloudFront-Forwarded-Proto': 'https',
            'CloudFront-Is-Desktop-Viewer': 'true',
            'CloudFront-Is-Mobile-Viewer': 'false',
            'CloudFront-Is-SmartTV-Viewer': 'false',
            'CloudFront-Is-Tablet-Viewer': 'false',
            'CloudFront-Viewer-Country': 'US',
            'Content-Type': 'application/json',
            headerName: 'headerValue',
            Host: 'gy415nuibc.execute-api.us-east-1.amazonaws.com',
            'Postman-Token': '9f583ef0-ed83-4a38-aef3-eb9ce3f7a57f',
            'User-Agent': 'PostmanRuntime/2.4.5',
            Via: '1.1 d98420743a69852491bbdea73f7680bd.cloudfront.net (CloudFront)',
            'X-Amz-Cf-Id': 'pn-PWIJc6thYnZm5P0NMgOUglL1DYtl0gdeJky8tqsg8iS_sgsKD1A==',
            'X-Forwarded-For': '54.240.196.186, 54.182.214.83',
            'X-Forwarded-Port': '443',
            'X-Forwarded-Proto': 'https',
            Authorization
        },
        multiValueHeaders: {
            Accept: [
                '*/*'
            ],
            'Accept-Encoding': [
                'gzip, deflate'
            ],
            'cache-control': [
                'no-cache'
            ],
            'CloudFront-Forwarded-Proto': [
                'https'
            ],
            'CloudFront-Is-Desktop-Viewer': [
                'true'
            ],
            'CloudFront-Is-Mobile-Viewer': [
                'false'
            ],
            'CloudFront-Is-SmartTV-Viewer': [
                'false'
            ],
            'CloudFront-Is-Tablet-Viewer': [
                'false'
            ],
            'CloudFront-Viewer-Country': [
                'US'
            ],
            'Content-Type': [
                'application/json'
            ],
            headerName: [
                'headerValue'
            ],
            Host: [
                'gy415nuibc.execute-api.us-east-1.amazonaws.com'
            ],
            'Postman-Token': [
                '9f583ef0-ed83-4a38-aef3-eb9ce3f7a57f'
            ],
            'User-Agent': [
                'PostmanRuntime/2.4.5'
            ],
            Via: [
                '1.1 d98420743a69852491bbdea73f7680bd.cloudfront.net (CloudFront)'
            ],
            'X-Amz-Cf-Id': [
                'pn-PWIJc6thYnZm5P0NMgOUglL1DYtl0gdeJky8tqsg8iS_sgsKD1A=='
            ],
            'X-Forwarded-For': [
                '54.240.196.186, 54.182.214.83'
            ],
            'X-Forwarded-Port': [
                '443'
            ],
            'X-Forwarded-Proto': [
                'https'
            ]
        },
        multiValueQueryStringParameters,
        pathParameters: {
            proxy: 'hello/world'
        },
        stageVariables: {
            stageVariableName: 'stageVariableValue'
        },
        requestContext: {
            accountId: '12345678912',
            resourceId: 'roq9wj',
            stage: 'mockStage',
            requestId: 'deef4878-7910-11e6-8f14-25afc3e9ae33',
            identity: {
                cognitoIdentityPoolId: null,
                accountId: null,
                cognitoIdentityId: null,
                caller: null,
                apiKey: null,
                sourceIp: '192.168.196.186',
                cognitoAuthenticationType: null,
                cognitoAuthenticationProvider: null,
                userArn: null,
                userAgent: 'PostmanRuntime/2.4.5',
                user: null
            },
            resourcePath: '/{proxy+}',
            httpMethod,
            apiId: 'gy415nuibc'
        },
        body: body ? JSON.stringify(body) : null,
        isBase64Encoded: false
    }
}
