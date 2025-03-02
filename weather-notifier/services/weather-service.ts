import { WeatherForecast } from '../types/openweathermap';

const weatherService = {
  async getWeatherForecast(): Promise<string> {
    const lat = process.env.WEATHER_LAT;
    const lon = process.env.WEATHER_LON;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!lat || !lon || !apiKey) {
      throw new Error('One or more environment variables (WEATHER_LAT, WEATHER_LON, WEATHER_API_KEY) are not set');
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast`;
    const queryParams = new URLSearchParams({
      lat,
      lon,
      appid: apiKey,
      units: 'metric',
      cnt: '6',
    });

    try {
      console.info('Fetching weather data from OpenWeatherMap API');
      const response = await fetch(`${url}?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: WeatherForecast = await response.json();
      console.info('Weather data fetched successfully');

      // Sum snowfall
      const snowSum = data.list.reduce((sum, item) => {
        return sum + (item.snow?.['3h'] || 0);
      }, 0);

      // Round snowSum
      const roundedSnowSum = Math.round(snowSum);

      // Generate date text using Intl.DateTimeFormat
      const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
      });
      const startDate = new Date(data.list[0].dt * 1000);
      const endDate = new Date(data.list[data.list.length - 1].dt * 1000);
      const dateText = `${dateFormatter.format(startDate)}〜${dateFormatter.format(endDate)}`;

      // Return formatted text
      return `${dateText}の予想降雪量：${roundedSnowSum}cm`;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },
};

export default weatherService;
