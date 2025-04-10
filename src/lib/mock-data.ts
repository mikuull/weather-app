import type { WeatherData } from '@/types/types';

export const mockWeatherData: WeatherData = {
  current: {
    city: 'Warsaw',
    country: 'PL',
    temperature: 18,
    condition: 'Partly Cloudy',
    icon: 'cloud',
    humidity: 62,
    windSpeed: 12,
    sunrise: '06:45',
    sunset: '19:30',
    feelsLike: 17,
    uvIndex: 5,
  },
  forecast: [
    {
      day: 'Today',
      high: 19,
      low: 14,
      condition: 'Partly Cloudy',
      icon: 'cloud',
    },
    { day: 'Tomorrow', high: 21, low: 15, condition: 'Sunny', icon: 'sun' },
    { day: 'Wed', high: 20, low: 14, condition: 'Cloudy', icon: 'cloud' },
    { day: 'Thu', high: 18, low: 13, condition: 'Rain', icon: 'cloud-rain' },
    { day: 'Fri', high: 17, low: 12, condition: 'Rain', icon: 'cloud-rain' },
  ],
  hourly: [
    { time: 'Now', temperature: 18, icon: 'cloud' },
    { time: '2PM', temperature: 19, icon: 'sun' },
    { time: '3PM', temperature: 19, icon: 'sun' },
    { time: '4PM', temperature: 18, icon: 'cloud' },
    { time: '5PM', temperature: 17, icon: 'cloud' },
    { time: '6PM', temperature: 16, icon: 'cloud-rain' },
    { time: '7PM', temperature: 15, icon: 'cloud-rain' },
    { time: '8PM', temperature: 14, icon: 'cloud' },
  ],
};
