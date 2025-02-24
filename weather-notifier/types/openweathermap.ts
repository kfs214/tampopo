export type WeatherForecast = {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
};

type City = {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type Coord = {
  lat: number;
  lon: number;
};

type List = {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: Date;
  snow?: Snow;
};

type Clouds = {
  all: number;
};

type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type Snow = {
  '3h': number;
};

type Sys = {
  pod: string;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};
