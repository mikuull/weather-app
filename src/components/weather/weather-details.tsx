import { Card, CardContent } from '@/components/ui/card';
import type { CurrentWeatherData } from '@/types/types';
import { DetailItem } from './detail/detail-item';

interface WeatherDetailsProps {
  data: CurrentWeatherData;
}

export function WeatherDetails({ data }: WeatherDetailsProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          <DetailItem label="Feels Like" value={`${data.feelsLike}°`} />
          <DetailItem label="UV Index" value={`${data.uvIndex} of 10`} />
          <DetailItem label="Humidity" value={`${data.humidity}%`} />
          <DetailItem label="Wind Speed" value={`${data.windSpeed} km/h`} />
          <DetailItem label="Sunrise" value={data.sunrise} />
          <DetailItem label="Sunset" value={data.sunset} />
        </div>
      </CardContent>
    </Card>
  );
}
