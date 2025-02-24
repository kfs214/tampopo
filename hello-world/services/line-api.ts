const lineApi = {
  async push(to: string, message: string) {
    const url = 'https://api.line.me/v2/bot/message/push';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
    };
    const data = {
      to,
      messages: [
        {
          type: 'text',
          text: message,
        },
      ],
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
};

export default lineApi;
