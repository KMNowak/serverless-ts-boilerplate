import { CustomAuthorizerHandler, CustomAuthorizerEvent, CustomAuthorizerCallback, Context } from 'aws-lambda'

export const handler: CustomAuthorizerHandler = (event: CustomAuthorizerEvent, _: Context, callback: CustomAuthorizerCallback) => {
    switch (event.authorizationToken.toLowerCase()) {
        case 'allow':
            callback(null, generatePolicy('user', 'Allow', event.methodArn))
            break
        case 'deny':
            callback(null, generatePolicy('user', 'Deny', event.methodArn))
            break
        case 'unauthorized':
            callback('Unauthorized')   // Return a 401 Unauthorized response
            break
        default:
            callback('Error: Invalid token')
    }
}

// Help function to generate an IAM policy
const generatePolicy = (principalId: string, effect: string, resource: string) => {
    const VERSION = '2012-10-17'

    if (effect && resource) {
        return {
            principalId,
            policyDocument: {
                Version: VERSION,
                Statement: [{
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }]
            }
        }
    }

    return {
        principalId,
        policyDocument: {
            Version: VERSION,
            Statement: []
        }
    }
}
