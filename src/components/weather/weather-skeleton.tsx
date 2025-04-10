import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function WeatherSkeleton() {
  return (
    <>
      <Card className="bg-zinc-900 border-zinc-800 mb-8">
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-32 bg-zinc-800" />
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-12 w-24 bg-zinc-800 mb-2" />
              <Skeleton className="h-4 w-20 bg-zinc-800" />
            </div>
            <Skeleton className="h-16 w-16 rounded-full bg-zinc-800" />
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 bg-zinc-800" />
                <Skeleton className="h-4 w-16 bg-zinc-800" />
                <Skeleton className="h-4 w-8 bg-zinc-800 ml-auto" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="w-full overflow-x-auto pb-2">
            <div className="flex gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="h-3 w-8 bg-zinc-800 mb-1" />
                  <Skeleton className="h-8 w-8 rounded-full bg-zinc-800 my-1" />
                  <Skeleton className="h-3 w-6 bg-zinc-800" />
                </div>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>

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
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0"
                >
                  <Skeleton className="h-4 w-16 bg-zinc-800" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full bg-zinc-800" />
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-6 bg-zinc-800" />
                      <Skeleton className="h-4 w-6 bg-zinc-800" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
