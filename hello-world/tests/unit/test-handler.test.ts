import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import weatherService from '../../services/weather-service';
import lineApiService from '../../services/line-api-service';

jest.mock('../../services/weather-service');
jest.mock('../../services/line-api-service');

describe('Unit test for app handler', function () {
  beforeEach(() => {
    process.env.LINE_TO = 'test_line_to';
    (weatherService.getWeatherForecast as jest.Mock).mockResolvedValue('Test weather forecast');
    (lineApiService.push as jest.Mock).mockResolvedValue({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('verifies successful response', async () => {
    const result: APIGatewayProxyResult = await lambdaHandler();

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(
      JSON.stringify({
        message: 'Message sent to LINE successfully',
      }),
    );
    expect(weatherService.getWeatherForecast).toHaveBeenCalled();
    expect(lineApiService.push).toHaveBeenCalledWith({
      to: 'test_line_to',
      messages: [
        {
          type: 'text',
          text: 'Test weather forecast',
        },
      ],
    });
  });

  it('should return 500 if LINE_TO is not set', async () => {
    delete process.env.LINE_TO;

    const result: APIGatewayProxyResult = await lambdaHandler();

    expect(result.statusCode).toEqual(500);
    expect(result.body).toEqual(
      JSON.stringify({
        message: 'some error happened',
      }),
    );
  });
});
