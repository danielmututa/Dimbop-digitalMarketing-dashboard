import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  change: number; // use positive or negative values
};

const DashboardCard = ({ title, value, change }: DashboardCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm text-gray-500">{title}</h4>
          <div className="text-xl font-bold">{value}</div>
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          {Math.abs(change)}%
        </div>
      </div>

      <button className="mt-4 text-blue-600 font-medium text-sm hover:underline">
        View Report →
      </button>
    </div>
  );
};

export default DashboardCard;
