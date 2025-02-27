import weatherService from '../../services/weather-service';

describe('weatherService', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            cod: '200',
            message: 0,
            cnt: 6,
            list: [
              {
                dt: 1740387600,
                main: {
                  temp: -6.64,
                  feels_like: -10.22,
                  temp_min: -6.64,
                  temp_max: -6.64,
                  pressure: 1017,
                  sea_level: 1017,
                  grnd_level: 982,
                  humidity: 81,
                  temp_kf: 0,
                },
                weather: [
                  {
                    id: 803,
                    main: 'Clouds',
                    description: 'broken clouds',
                    icon: '04n',
                  },
                ],
                clouds: {
                  all: 60,
                },
                wind: {
                  speed: 2.02,
                  deg: 77,
                  gust: 1.44,
                },
                visibility: 10000,
                pop: 0,
                sys: {
                  pod: 'n',
                },
                dt_txt: '2025-02-24 09:00:00',
              },
              {
                dt: 1740398400,
                main: {
                  temp: -6.71,
                  feels_like: -9.58,
                  temp_min: -6.86,
                  temp_max: -6.71,
                  pressure: 1017,
                  sea_level: 1017,
                  grnd_level: 982,
                  humidity: 82,
                  temp_kf: 0.15,
                },
                weather: [
                  {
                    id: 803,
                    main: 'Clouds',
                    description: 'broken clouds',
                    icon: '04n',
                  },
                ],
                clouds: {
                  all: 54,
                },
                wind: {
                  speed: 1.59,
                  deg: 99,
                  gust: 1.21,
                },
                visibility: 10000,
                pop: 0,
                sys: {
                  pod: 'n',
                },
                dt_txt: '2025-02-24 12:00:00',
              },
              {
                dt: 1740409200,
                main: {
                  temp: -6.44,
                  feels_like: -6.44,
                  temp_min: -6.44,
                  temp_max: -6.34,
                  pressure: 1017,
                  sea_level: 1017,
                  grnd_level: 983,
                  humidity: 83,
                  temp_kf: -0.1,
                },
                weather: [
                  {
                    id: 803,
                    main: 'Clouds',
                    description: 'broken clouds',
                    icon: '04n',
                  },
                ],
                clouds: {
                  all: 81,
                },
                wind: {
                  speed: 1.17,
                  deg: 123,
                  gust: 1.99,
                },
                visibility: 10000,
                pop: 0,
                sys: {
                  pod: 'n',
                },
                dt_txt: '2025-02-24 15:00:00',
              },
              {
                dt: 1740420000,
                main: {
                  temp: -5.9,
                  feels_like: -5.9,
                  temp_min: -5.9,
                  temp_max: -5.9,
                  pressure: 1017,
                  sea_level: 1017,
                  grnd_level: 983,
                  humidity: 87,
                  temp_kf: 0,
                },
                weather: [
                  {
                    id: 600,
                    main: 'Snow',
                    description: 'light snow',
                    icon: '13n',
                  },
                ],
                clouds: {
                  all: 91,
                },
                wind: {
                  speed: 0.99,
                  deg: 120,
                  gust: 1.27,
                },
                visibility: 10000,
                pop: 0.34,
                snow: {
                  '3h': 0.38,
                },
                sys: {
                  pod: 'n',
                },
                dt_txt: '2025-02-24 18:00:00',
              },
              {
                dt: 1740430800,
                main: {
                  temp: -6.25,
                  feels_like: -6.25,
                  temp_min: -6.25,
                  temp_max: -6.25,
                  pressure: 1018,
                  sea_level: 1018,
                  grnd_level: 983,
                  humidity: 89,
                  temp_kf: 0,
                },
                weather: [
                  {
                    id: 600,
                    main: 'Snow',
                    description: 'light snow',
                    icon: '13n',
                  },
                ],
                clouds: {
                  all: 94,
                },
                wind: {
                  speed: 1.07,
                  deg: 110,
                  gust: 1.11,
                },
                visibility: 10000,
                pop: 0.47,
                snow: {
                  '3h': 0.12,
                },
                sys: {
                  pod: 'n',
                },
                dt_txt: '2025-02-24 21:00:00',
              },
              {
                dt: 1740441600,
                main: {
                  temp: -2.21,
                  feels_like: -5.43,
                  temp_min: -2.21,
                  temp_max: -2.21,
                  pressure: 1019,
                  sea_level: 1019,
                  grnd_level: 985,
                  humidity: 65,
                  temp_kf: 0,
                },
                weather: [
                  {
                    id: 803,
                    main: 'Clouds',
                    description: 'broken clouds',
                    icon: '04d',
                  },
                ],
                clouds: {
                  all: 78,
                },
                wind: {
                  speed: 2.32,
                  deg: 276,
                  gust: 6.77,
                },
                visibility: 10000,
                pop: 0.31,
                sys: {
                  pod: 'd',
                },
                dt_txt: '2025-02-25 00:00:00',
              },
            ],
            city: {
              id: 2127419,
              name: 'Yūbari',
              coord: {
                lat: 43.0516,
                lon: 141.9689,
              },
              country: 'JP',
              population: 0,
              timezone: 32400,
              sunrise: 1740345422,
              sunset: 1740384846,
            },
          }),
      }),
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('should fetch weather forecast and return formatted text', () => {
    it('expected snow', async () => {
      const result = await weatherService.getWeatherForecast();

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.openweathermap.org/data/2.5/forecast'),
      );

      expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(/lat=test_weather_lat/));
      expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(/lon=test_weather_lon/));
      expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(/appid=test_api_key/));

      expect(result).toBe('2/24 18時〜2/25 9時の予想降雪量：1cm');
    });

    it('no snow', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              cod: '200',
              message: 0,
              cnt: 6,
              list: [
                {
                  dt: 1740387600,
                  main: {
                    temp: -6.64,
                    feels_like: -10.22,
                    temp_min: -6.64,
                    temp_max: -6.64,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 982,
                    humidity: 81,
                    temp_kf: 0,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04n',
                    },
                  ],
                  clouds: {
                    all: 60,
                  },
                  wind: {
                    speed: 2.02,
                    deg: 77,
                    gust: 1.44,
                  },
                  visibility: 10000,
                  pop: 0,
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 09:00:00',
                },
                {
                  dt: 1740398400,
                  main: {
                    temp: -6.71,
                    feels_like: -9.58,
                    temp_min: -6.86,
                    temp_max: -6.71,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 982,
                    humidity: 82,
                    temp_kf: 0.15,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04n',
                    },
                  ],
                  clouds: {
                    all: 54,
                  },
                  wind: {
                    speed: 1.59,
                    deg: 99,
                    gust: 1.21,
                  },
                  visibility: 10000,
                  pop: 0,
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 12:00:00',
                },
                {
                  dt: 1740409200,
                  main: {
                    temp: -6.44,
                    feels_like: -6.44,
                    temp_min: -6.44,
                    temp_max: -6.34,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 983,
                    humidity: 83,
                    temp_kf: -0.1,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04n',
                    },
                  ],
                  clouds: {
                    all: 81,
                  },
                  wind: {
                    speed: 1.17,
                    deg: 123,
                    gust: 1.99,
                  },
                  visibility: 10000,
                  pop: 0,
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 15:00:00',
                },
                {
                  dt: 1740420000,
                  main: {
                    temp: -6.44,
                    feels_like: -6.44,
                    temp_min: -6.44,
                    temp_max: -6.34,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 983,
                    humidity: 83,
                    temp_kf: -0.1,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04n',
                    },
                  ],
                  clouds: {
                    all: 81,
                  },
                  wind: {
                    speed: 1.17,
                    deg: 123,
                    gust: 1.99,
                  },
                  visibility: 10000,
                  pop: 0,
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 18:00:00',
                },
                {
                  dt: 1740430800,
                  main: {
                    temp: -6.44,
                    feels_like: -6.44,
                    temp_min: -6.44,
                    temp_max: -6.34,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 983,
                    humidity: 83,
                    temp_kf: -0.1,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04n',
                    },
                  ],
                  clouds: {
                    all: 81,
                  },
                  wind: {
                    speed: 1.17,
                    deg: 123,
                    gust: 1.99,
                  },
                  visibility: 10000,
                  pop: 0,
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 21:00:00',
                },
                {
                  dt: 1740441600,
                  main: {
                    temp: -2.21,
                    feels_like: -5.43,
                    temp_min: -2.21,
                    temp_max: -2.21,
                    pressure: 1019,
                    sea_level: 1019,
                    grnd_level: 985,
                    humidity: 65,
                    temp_kf: 0,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04d',
                    },
                  ],
                  clouds: {
                    all: 78,
                  },
                  wind: {
                    speed: 2.32,
                    deg: 276,
                    gust: 6.77,
                  },
                  visibility: 10000,
                  pop: 0.31,
                  sys: {
                    pod: 'd',
                  },
                  dt_txt: '2025-02-25 00:00:00',
                },
              ],
              city: {
                id: 2127419,
                name: 'Yūbari',
                coord: {
                  lat: 43.0516,
                  lon: 141.9689,
                },
                country: 'JP',
                population: 0,
                timezone: 32400,
                sunrise: 1740345422,
                sunset: 1740384846,
              },
            }),
        }),
      ) as jest.Mock;
      const result = await weatherService.getWeatherForecast();

      expect(result).toBe('2/24 18時〜2/25 9時の予想降雪量：0cm');
    });

    it('<0.5', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              cod: '200',
              message: 0,
              cnt: 6,
              list: [
                {
                  dt: 1740387600,
                  main: {
                    temp: -6.64,
                    feels_like: -10.22,
                    temp_min: -6.64,
                    temp_max: -6.64,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 982,
                    humidity: 81,
                    temp_kf: 0,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04n',
                    },
                  ],
                  clouds: {
                    all: 60,
                  },
                  wind: {
                    speed: 2.02,
                    deg: 77,
                    gust: 1.44,
                  },
                  visibility: 10000,
                  pop: 0,
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 09:00:00',
                },
                {
                  dt: 1740398400,
                  main: {
                    temp: -6.71,
                    feels_like: -9.58,
                    temp_min: -6.86,
                    temp_max: -6.71,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 982,
                    humidity: 82,
                    temp_kf: 0.15,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04n',
                    },
                  ],
                  clouds: {
                    all: 54,
                  },
                  wind: {
                    speed: 1.59,
                    deg: 99,
                    gust: 1.21,
                  },
                  visibility: 10000,
                  pop: 0,
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 12:00:00',
                },
                {
                  dt: 1740409200,
                  main: {
                    temp: -6.44,
                    feels_like: -6.44,
                    temp_min: -6.44,
                    temp_max: -6.34,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 983,
                    humidity: 83,
                    temp_kf: -0.1,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04n',
                    },
                  ],
                  clouds: {
                    all: 81,
                  },
                  wind: {
                    speed: 1.17,
                    deg: 123,
                    gust: 1.99,
                  },
                  visibility: 10000,
                  pop: 0,
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 15:00:00',
                },
                {
                  dt: 1740420000,
                  main: {
                    temp: -5.9,
                    feels_like: -5.9,
                    temp_min: -5.9,
                    temp_max: -5.9,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 983,
                    humidity: 87,
                    temp_kf: 0,
                  },
                  weather: [
                    {
                      id: 600,
                      main: 'Snow',
                      description: 'light snow',
                      icon: '13n',
                    },
                  ],
                  clouds: {
                    all: 91,
                  },
                  wind: {
                    speed: 0.99,
                    deg: 120,
                    gust: 1.27,
                  },
                  visibility: 10000,
                  pop: 0.34,
                  snow: {
                    '3h': 0.24,
                  },
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 18:00:00',
                },
                {
                  dt: 1740430800,
                  main: {
                    temp: -6.25,
                    feels_like: -6.25,
                    temp_min: -6.25,
                    temp_max: -6.25,
                    pressure: 1018,
                    sea_level: 1018,
                    grnd_level: 983,
                    humidity: 89,
                    temp_kf: 0,
                  },
                  weather: [
                    {
                      id: 600,
                      main: 'Snow',
                      description: 'light snow',
                      icon: '13n',
                    },
                  ],
                  clouds: {
                    all: 94,
                  },
                  wind: {
                    speed: 1.07,
                    deg: 110,
                    gust: 1.11,
                  },
                  visibility: 10000,
                  pop: 0.47,
                  snow: {
                    '3h': 0.25,
                  },
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 21:00:00',
                },
                {
                  dt: 1740441600,
                  main: {
                    temp: -2.21,
                    feels_like: -5.43,
                    temp_min: -2.21,
                    temp_max: -2.21,
                    pressure: 1019,
                    sea_level: 1019,
                    grnd_level: 985,
                    humidity: 65,
                    temp_kf: 0,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04d',
                    },
                  ],
                  clouds: {
                    all: 78,
                  },
                  wind: {
                    speed: 2.32,
                    deg: 276,
                    gust: 6.77,
                  },
                  visibility: 10000,
                  pop: 0.31,
                  sys: {
                    pod: 'd',
                  },
                  dt_txt: '2025-02-25 00:00:00',
                },
              ],
              city: {
                id: 2127419,
                name: 'Yūbari',
                coord: {
                  lat: 43.0516,
                  lon: 141.9689,
                },
                country: 'JP',
                population: 0,
                timezone: 32400,
                sunrise: 1740345422,
                sunset: 1740384846,
              },
            }),
        }),
      ) as jest.Mock;
      const result = await weatherService.getWeatherForecast();

      expect(result).toBe('2/24 18時〜2/25 9時の予想降雪量：0cm');
    });

    it('<0.5', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              cod: '200',
              message: 0,
              cnt: 6,
              list: [
                {
                  dt: 1740387600,
                  main: {
                    temp: -6.64,
                    feels_like: -10.22,
                    temp_min: -6.64,
                    temp_max: -6.64,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 982,
                    humidity: 81,
                    temp_kf: 0,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04n',
                    },
                  ],
                  clouds: {
                    all: 60,
                  },
                  wind: {
                    speed: 2.02,
                    deg: 77,
                    gust: 1.44,
                  },
                  visibility: 10000,
                  pop: 0,
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 09:00:00',
                },
                {
                  dt: 1740398400,
                  main: {
                    temp: -6.71,
                    feels_like: -9.58,
                    temp_min: -6.86,
                    temp_max: -6.71,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 982,
                    humidity: 82,
                    temp_kf: 0.15,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04n',
                    },
                  ],
                  clouds: {
                    all: 54,
                  },
                  wind: {
                    speed: 1.59,
                    deg: 99,
                    gust: 1.21,
                  },
                  visibility: 10000,
                  pop: 0,
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 12:00:00',
                },
                {
                  dt: 1740409200,
                  main: {
                    temp: -6.44,
                    feels_like: -6.44,
                    temp_min: -6.44,
                    temp_max: -6.34,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 983,
                    humidity: 83,
                    temp_kf: -0.1,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04n',
                    },
                  ],
                  clouds: {
                    all: 81,
                  },
                  wind: {
                    speed: 1.17,
                    deg: 123,
                    gust: 1.99,
                  },
                  visibility: 10000,
                  pop: 0,
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 15:00:00',
                },
                {
                  dt: 1740420000,
                  main: {
                    temp: -5.9,
                    feels_like: -5.9,
                    temp_min: -5.9,
                    temp_max: -5.9,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 983,
                    humidity: 87,
                    temp_kf: 0,
                  },
                  weather: [
                    {
                      id: 600,
                      main: 'Snow',
                      description: 'light snow',
                      icon: '13n',
                    },
                  ],
                  clouds: {
                    all: 91,
                  },
                  wind: {
                    speed: 0.99,
                    deg: 120,
                    gust: 1.27,
                  },
                  visibility: 10000,
                  pop: 0.34,
                  snow: {
                    '3h': 5.24,
                  },
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 18:00:00',
                },
                {
                  dt: 1740430800,
                  main: {
                    temp: -6.25,
                    feels_like: -6.25,
                    temp_min: -6.25,
                    temp_max: -6.25,
                    pressure: 1018,
                    sea_level: 1018,
                    grnd_level: 983,
                    humidity: 89,
                    temp_kf: 0,
                  },
                  weather: [
                    {
                      id: 600,
                      main: 'Snow',
                      description: 'light snow',
                      icon: '13n',
                    },
                  ],
                  clouds: {
                    all: 94,
                  },
                  wind: {
                    speed: 1.07,
                    deg: 110,
                    gust: 1.11,
                  },
                  visibility: 10000,
                  pop: 0.47,
                  snow: {
                    '3h': 5.25,
                  },
                  sys: {
                    pod: 'n',
                  },
                  dt_txt: '2025-02-24 21:00:00',
                },
                {
                  dt: 1740441600,
                  main: {
                    temp: -2.21,
                    feels_like: -5.43,
                    temp_min: -2.21,
                    temp_max: -2.21,
                    pressure: 1019,
                    sea_level: 1019,
                    grnd_level: 985,
                    humidity: 65,
                    temp_kf: 0,
                  },
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04d',
                    },
                  ],
                  clouds: {
                    all: 78,
                  },
                  wind: {
                    speed: 2.32,
                    deg: 276,
                    gust: 6.77,
                  },
                  visibility: 10000,
                  pop: 0.31,
                  sys: {
                    pod: 'd',
                  },
                  dt_txt: '2025-02-25 00:00:00',
                },
              ],
              city: {
                id: 2127419,
                name: 'Yūbari',
                coord: {
                  lat: 43.0516,
                  lon: 141.9689,
                },
                country: 'JP',
                population: 0,
                timezone: 32400,
                sunrise: 1740345422,
                sunset: 1740384846,
              },
            }),
        }),
      ) as jest.Mock;
      const result = await weatherService.getWeatherForecast();

      expect(result).toBe('2/24 18時〜2/25 9時の予想降雪量：10cm');
    });
  });

  it('should throw an error if the request fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Internal Server Error',
      }),
    ) as jest.Mock;

    await expect(weatherService.getWeatherForecast()).rejects.toThrow('Error: Internal Server Error');
  });
});
