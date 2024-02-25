export type WeatherResponseType = {
  name: string
  coord: {
    lat: number
    lon: number
  }
  weather: [
    {
      main: string
      description: string
    }
  ]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  wind: {
    speed: number
    deg: number
  }
  sys: {
    sunrise: number
    sunset: number
  }
  clouds: {
    all: number
  }
  timezone: number
}
