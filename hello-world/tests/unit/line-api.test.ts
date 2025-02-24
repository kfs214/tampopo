import lineApi from '../../services/line-api';

describe('lineApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }),
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should send a message successfully', async () => {
    const to = 'testUser';
    const message = 'Hello, World!';
    const response = await lineApi.push(to, message);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.line.me/v2/bot/message/push',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer test_line_access_token`,
        },
        body: JSON.stringify({
          to: to,
          messages: [
            {
              type: 'text',
              text: message,
            },
          ],
        }),
      }),
    );
    expect(response).toEqual({});
  });

  it('should throw an error if the request fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Internal Server Error',
      }),
    ) as jest.Mock;

    const to = 'testUser';
    const message = 'Hello, World!';

    await expect(lineApi.push(to, message)).rejects.toThrow('Error: Internal Server Error');
  });
});
