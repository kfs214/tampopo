import { APIGatewayProxyResult } from 'aws-lambda';
import weatherService from './services/weather-service';
import lineApiService from './services/line-api-service';

/**
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    // Get weather forecast text message
    const weatherMessage = await weatherService.getWeatherForecast();

    // Send message to LINE
    const lineTo = process.env.LINE_TO;

    if (!lineTo) {
      throw new Error('LINE_TO environment variable is not set');
    }

    await lineApiService.push({
      to: lineTo,
      messages: [
        {
          type: 'text',
          text: weatherMessage,
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Message sent to LINE successfully',
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  }
};
