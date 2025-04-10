export interface CurrentWeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
  feelsLike: number;
  uvIndex: number;
}

export interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  icon: string;
}

export interface WeatherData {
  current: CurrentWeatherData;
  forecast: ForecastDay[];
  hourly: HourlyForecast[];
}

export const weatherIcons: Record<string, string> = {
  sun: '☀️',
  cloud: '☁️',
  'cloud-rain': '🌧️',
  'cloud-snow': '❄️',
  'cloud-lightning': '⚡',
  wind: '💨',
};
