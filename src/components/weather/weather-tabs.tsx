import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DailyForecast } from './forecast/daily-forecast';
import { WeatherDetails } from './weather-details';
import type { ForecastDay, CurrentWeatherData } from '@/types/types';

interface WeatherTabsProps {
  forecast: ForecastDay[];
  details: CurrentWeatherData;
}

export function WeatherTabs({ forecast, details }: WeatherTabsProps) {
  return (
    <Tabs defaultValue="forecast" className="w-full">
      <TabsList className="grid grid-cols-2 bg-zinc-900 border border-zinc-800">
        <TabsTrigger
          value="forecast"
          className="data-[state=active]:bg-zinc-800"
        >
          5-Day Forecast
        </TabsTrigger>
        <TabsTrigger
          value="details"
          className="data-[state=active]:bg-zinc-800"
        >
          Weather Details
        </TabsTrigger>
      </TabsList>
      <TabsContent value="forecast">
        <DailyForecast data={forecast} />
      </TabsContent>
      <TabsContent value="details">
        <WeatherDetails data={details} />
      </TabsContent>
    </Tabs>
  );
}
