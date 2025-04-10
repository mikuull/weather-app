import { weatherIcons } from '@/types/types';

export function useWeatherIcon() {
  const getWeatherIcon = (iconName: string): string => {
    return weatherIcons[iconName] || weatherIcons.cloud;
  };

  return { getWeatherIcon };
}
