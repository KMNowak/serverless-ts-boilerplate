import { APIGatewayEvent, Handler } from 'aws-lambda'

export const handler: Handler = async (event: APIGatewayEvent) => {
  const { httpMethod, path, queryStringParameters, pathParameters, body } = event
  const response = {
    statusCode: 201,
    body: JSON.stringify({
      message: 'createChatMessage',
      method: httpMethod,
      path,
      query: queryStringParameters,
      params: pathParameters,
      body
    })
  }

  return response
}
