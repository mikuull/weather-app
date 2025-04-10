import type React from 'react';
import { MapPin, Droplets, Wind, Sunrise, Sunset } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HourlyForecast } from './forecast/hourly-forecast';
import { useWeatherIcon } from '@/hooks/use-weather-icon';
import type {
  CurrentWeatherData,
  HourlyForecast as HourlyForecastType,
} from '@/types/types';
import { WeatherStat } from './weather-stat';

interface CurrentWeatherProps {
  data: CurrentWeatherData;
  hourlyData: HourlyForecastType[];
}

export function CurrentWeather({ data, hourlyData }: CurrentWeatherProps) {
  const { getWeatherIcon } = useWeatherIcon();

  return (
    <Card className="bg-zinc-900 border-zinc-800 mb-8 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-zinc-400" />
          <CardDescription className="text-zinc-400">
            {data.city}, {data.country}
          </CardDescription>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-6xl font-light tracking-tighter">
              {data.temperature}°
            </CardTitle>
            <p className="text-sm text-zinc-400">{data.condition}</p>
          </div>
          <div className="text-7xl">{getWeatherIcon(data.icon)}</div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <WeatherStat
            icon={<Droplets className="h-4 w-4 text-zinc-400" />}
            label="Humidity"
            value={`${data.humidity}%`}
          />
          <WeatherStat
            icon={<Wind className="h-4 w-4 text-zinc-400" />}
            label="Wind"
            value={`${data.windSpeed} km/h`}
          />
          <WeatherStat
            icon={<Sunrise className="h-4 w-4 text-zinc-400" />}
            label="Sunrise"
            value={data.sunrise}
          />
          <WeatherStat
            icon={<Sunset className="h-4 w-4 text-zinc-400" />}
            label="Sunset"
            value={data.sunset}
          />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <HourlyForecast data={hourlyData} />
      </CardFooter>
    </Card>
  );
}
