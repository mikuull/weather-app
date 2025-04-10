/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  WeatherData,
  CurrentWeatherData,
  ForecastDay,
  HourlyForecast,
} from '@/types/types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

const mapWeatherIcon = (iconCode: string): string => {
  const iconMap: Record<string, string> = {
    '01d': 'sun',
    '01n': 'sun',
    '02d': 'cloud',
    '02n': 'cloud',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'cloud-rain',
    '09n': 'cloud-rain',
    '10d': 'cloud-rain',
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning',
    '11n': 'cloud-lightning',
    '13d': 'cloud-snow',
    '13n': 'cloud-snow',
    '50d': 'wind',
    '50n': 'wind',
  };
  return iconMap[iconCode] || 'cloud';
};

const formatTime = (timestamp: number, timezone: number): string => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const formatDay = (timestamp: number, timezone: number): string => {
  const date = new Date((timestamp + timezone) * 1000);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
};

export async function getCoordinates(
  city: string
): Promise<{ lat: number; lon: number; name: string; country: string } | null> {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!data || data.length === 0) {
      return null;
    }

    return {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
      country: data[0].country,
    };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
}

export async function getLocationName(
  lat: number,
  lon: number
): Promise<{ name: string; country: string } | null> {
  try {
    const response = await fetch(
      `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!data || data.length === 0) {
      return null;
    }

    return {
      name: data[0].name,
      country: data[0].country,
    };
  } catch (error) {
    console.error('Error fetching location name:', error);
    return null;
  }
}

export async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<CurrentWeatherData | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!data) {
      return null;
    }

    return {
      city: data.name,
      country: data.sys.country,
      temperature: kelvinToCelsius(data.main.temp),
      condition: data.weather[0].main,
      icon: mapWeatherIcon(data.weather[0].icon),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      sunrise: formatTime(data.sys.sunrise, data.timezone),
      sunset: formatTime(data.sys.sunset, data.timezone),
      feelsLike: kelvinToCelsius(data.main.feels_like),
      uvIndex: 0,
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    return null;
  }
}

export async function getForecast(
  lat: number,
  lon: number
): Promise<{ daily: ForecastDay[]; hourly: HourlyForecast[] } | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!data || !data.list) {
      return null;
    }

    const hourly: HourlyForecast[] = data.list.slice(0, 8).map((item: any) => ({
      time: formatTime(item.dt, data.city.timezone),
      temperature: kelvinToCelsius(item.main.temp),
      icon: mapWeatherIcon(item.weather[0].icon),
    }));

    if (hourly.length > 0) {
      hourly[0].time = 'Now';
    }
    const dailyMap = new Map<
      string,
      { temps: number[]; icons: string[]; condition: string }
    >();

    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const day = date.toDateString();

      if (!dailyMap.has(day)) {
        dailyMap.set(day, {
          temps: [],
          icons: [],
          condition: item.weather[0].main,
        });
      }

      const dayData = dailyMap.get(day)!;
      dayData.temps.push(kelvinToCelsius(item.main.temp));
      dayData.icons.push(mapWeatherIcon(item.weather[0].icon));
    });

    const daily: ForecastDay[] = Array.from(dailyMap.entries())
      .slice(0, 5)
      .map(([day, data], index) => {
        const temps = data.temps;
        const high = Math.max(...temps);
        const low = Math.min(...temps);

        const iconCounts = data.icons.reduce(
          (acc: Record<string, number>, icon) => {
            acc[icon] = (acc[icon] || 0) + 1;
            return acc;
          },
          {}
        );

        const icon = Object.entries(iconCounts).sort(
          (a, b) => b[1] - a[1]
        )[0][0];

        return {
          day: formatDay(new Date(day).getTime() / 1000, 0),
          high,
          low,
          condition: data.condition,
          icon,
        };
      });

    return { daily, hourly };
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
}

export async function getWeatherData(
  city: string
): Promise<WeatherData | null> {
  try {
    const coordinates = await getCoordinates(city);

    if (!coordinates) {
      return null;
    }

    return getWeatherDataByCoords(
      coordinates.lat,
      coordinates.lon,
      coordinates.name,
      coordinates.country
    );
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

export async function getWeatherDataByCoords(
  lat: number,
  lon: number,
  cityName?: string,
  countryCode?: string
): Promise<WeatherData | null> {
  try {
    let locationName = { name: cityName || '', country: countryCode || '' };

    if (!cityName || !countryCode) {
      const fetchedLocation = await getLocationName(lat, lon);
      if (fetchedLocation) {
        locationName = fetchedLocation;
      }
    }

    const current = await getCurrentWeather(lat, lon);
    const forecast = await getForecast(lat, lon);

    if (!current || !forecast) {
      return null;
    }

    return {
      current: {
        ...current,
        city: locationName.name || current.city,
        country: locationName.country || current.country,
      },
      forecast: forecast.daily,
      hourly: forecast.hourly,
    };
  } catch (error) {
    console.error('Error fetching weather data by coords:', error);
    return null;
  }
}
