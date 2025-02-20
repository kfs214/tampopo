export const getWeatherForecastHandler = async () => {
  // Boilerplate code
  console.log('Getting weather forecast and sending a message via LINE');
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Weather forecast sent!' }),
  };
};
