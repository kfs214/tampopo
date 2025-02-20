// Import getWeatherForecastHandler function from get-weather-forecast.mjs
import { getWeatherForecastHandler } from '../../../src/handlers/get-weather-forecast.mjs';
import { jest } from '@jest/globals';

describe('Test for get-weather-forecast', function () {
  // This test invokes the get-weather-forecast Lambda function and verifies that the received payload is logged
  it('Verifies the function is triggered', async () => {
    // Mock console.log statements so we can verify them. For more information, see
    // https://jestjs.io/docs/en/mock-functions.html
    console.info = jest.fn();

    const { statusCode, body } = await getWeatherForecastHandler();

    expect(statusCode).toBe(200);
  });
});
