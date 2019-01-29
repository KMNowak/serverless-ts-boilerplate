import { APIGatewayEvent, Handler } from 'aws-lambda';

export const getRoomMessages: Handler = async (event: APIGatewayEvent) => {
  const { httpMethod, path, queryStringParameters, pathParameters, body } = event
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'getRoomMessages',
      method: httpMethod,
      path,
      query: queryStringParameters,
      params: pathParameters,
      body
    })
  }

  return response
}

export const getUserMessages: Handler = async (event: APIGatewayEvent) => {
  const { httpMethod, path, queryStringParameters, pathParameters, body } = event
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'getUserMessages',
      method: httpMethod,
      path,
      query: queryStringParameters,
      params: pathParameters,
      body
    })
  }

  return response
}