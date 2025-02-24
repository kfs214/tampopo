import { WeatherForecast } from '../types/openweathermap';

const weatherService = {
  async getWeatherForecast(): Promise<string> {
    const url = `https://api.openweathermap.org/data/2.5/forecast`;
    const queryParams = new URLSearchParams({
      lat: process.env.WEATHER_LAT || '',
      lon: process.env.WEATHER_LON || '',
      appid: process.env.WEATHER_API_KEY || '',
      units: 'metric',
      cnt: '6',
    });

    try {
      const response = await fetch(`${url}?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: WeatherForecast = await response.json();

      // Sum snowfall
      const snowSum = data.list.reduce((sum, item) => {
        return sum + (item.snow?.['3h'] || 0);
      }, 0);

      // Round snowSum
      const roundedSnowSum = Math.round(snowSum);

      // Generate date text
      const startDate = new Date(data.list[0].dt * 1000);
      const endDate = new Date(data.list[data.list.length - 1].dt * 1000);
      const dateText = `${startDate.getMonth() + 1}/${startDate.getDate()} ${startDate.getHours()}時〜${
        endDate.getMonth() + 1
      }/${endDate.getDate()} ${endDate.getHours()}時`;

      // Return formatted text
      return `${dateText}の予想降雪量：${roundedSnowSum}cm`;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },
};

export default weatherService;
