interface DetailItemProps {
  label: string;
  value: string;
}

export const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <div className="space-y-1">
      <p className="text-sm text-zinc-400">{label}</p>
      <p>{value}</p>
    </div>
  );
};
