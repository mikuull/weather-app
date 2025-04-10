'use client';

import { SearchBar } from '@/components/search-bar';
import { CurrentWeather } from '@/components/weather/current-weather';
import { WeatherTabs } from '@/components/weather/weather-tabs';
import { WeatherSkeleton } from '@/components/weather/weather-skeleton';
import { useWeather } from '@/hooks/use-weather';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function WeatherApp() {
  const { loading, weather, error, searchWeather } = useWeather();

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-light tracking-tighter mb-2">Weather</h1>
          <div className="flex gap-2">
            <div className="flex-1">
              <SearchBar onSearch={searchWeather} />
            </div>
          </div>
        </header>

        {error && (
          <Alert
            variant="destructive"
            className="mb-4 bg-red-950 border-red-900"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <WeatherSkeleton />
        ) : weather ? (
          <>
            <CurrentWeather
              data={weather.current}
              hourlyData={weather.hourly}
            />
            <WeatherTabs
              forecast={weather.forecast}
              details={weather.current}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p>
              No weather data available. Please try searching for a location.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
