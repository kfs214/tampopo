const lineApiService = {
  async push({ to, messages }: { to: string; messages: { type: 'text'; text: string }[] }) {
    const accessToken = process.env.LINE_ACCESS_TOKEN;

    if (!accessToken) {
      throw new Error('LINE_ACCESS_TOKEN environment variable is not set');
    }

    const url = 'https://api.line.me/v2/bot/message/push';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      to,
      messages,
    };

    try {
      console.info('Sending message to LINE API');
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      console.info('Message sent to LINE API successfully');
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
};

export default lineApiService;
