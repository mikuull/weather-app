import { Card, CardContent } from '@/components/ui/card';
import { useWeatherIcon } from '@/hooks/use-weather-icon';
import type { ForecastDay } from '@/types/types';

interface DailyForecastProps {
  data: ForecastDay[];
}

export function DailyForecast({ data }: DailyForecastProps) {
  const { getWeatherIcon } = useWeatherIcon();

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="pt-6">
        {data.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0"
          >
            <span className="font-medium">{day.day}</span>
            <div className="flex items-center gap-2">
              <span className="text-xl">{getWeatherIcon(day.icon)}</span>
              <div className="flex gap-2">
                <span>{day.high}°</span>
                <span className="text-zinc-400">{day.low}°</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
