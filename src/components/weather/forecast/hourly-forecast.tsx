import { useWeatherIcon } from '@/hooks/use-weather-icon';
import type { HourlyForecast as HourlyForecastType } from '@/types/types';

interface HourlyForecastProps {
  data: HourlyForecastType[];
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  const { getWeatherIcon } = useWeatherIcon();

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-6 min-w-max">
        {data.map((hour, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-xs text-zinc-400">{hour.time}</span>
            <span className="text-xl my-1">{getWeatherIcon(hour.icon)}</span>
            <span className="text-sm">{hour.temperature}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
