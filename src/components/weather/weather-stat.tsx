interface WeatherStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const WeatherStat = ({ icon, label, value }: WeatherStatProps) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm text-zinc-400">{label}</span>
      <span className="text-sm ml-auto">{value}</span>
    </div>
  );
};
