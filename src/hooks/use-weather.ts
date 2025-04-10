'use client';

import { useState, useEffect } from 'react';
import { getWeatherData, getWeatherDataByCoords } from '@/lib/weather-service';
import { mockWeatherData } from '@/lib/mock-data';
import type { WeatherData } from '@/types/types';

export function useWeather() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDefaultWeather();
  }, []);

  const fetchDefaultWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getWeatherData('Warsaw');

      if (data) {
        setWeather(data);
      } else {
        setWeather(mockWeatherData);
        setError('Could not fetch weather data. Showing mock data instead.');
      }
    } catch (err) {
      console.error('Error fetching default weather:', err);
      setWeather(mockWeatherData);
      setError('Could not fetch weather data. Showing mock data instead.');
    } finally {
      setLoading(false);
    }
  };

  const searchWeather = async (query: string) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getWeatherData(query);

      if (data) {
        setWeather(data);
      } else {
        setError(
          `Could not find weather data for "${query}". Please try another location.`
        );
      }
    } catch (err) {
      console.error('Error searching weather:', err);
      setError(
        'An error occurred while fetching weather data. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getWeatherDataByCoords(lat, lon);

      if (data) {
        setWeather(data);
      } else {
        setError('Could not fetch weather data for your location.');
      }
    } catch (err) {
      console.error('Error fetching location weather:', err);
      setError(
        'An error occurred while fetching weather data for your location.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    weather,
    error,
    searchWeather,
    getWeatherByCoords,
    refreshWeather: fetchDefaultWeather,
  };
}
