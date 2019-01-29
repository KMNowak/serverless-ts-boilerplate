import { APIGatewayEvent, Handler } from 'aws-lambda'
import { Client } from 'knex'

export const handler: Handler = async (event: APIGatewayEvent) => {
  const { httpMethod, path, queryStringParameters, pathParameters, body } = event
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `${Client.toString()}`,
      method: httpMethod,
      path,
      query: queryStringParameters,
      params: pathParameters,
      body
    })
  }

  return response
}