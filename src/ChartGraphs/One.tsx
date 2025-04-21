import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  percentageChange: number;
  subtext?: string;
};

const DashboardCard = ({
  title,
  value,
  percentageChange,
  subtext,
}: DashboardCardProps) => {
  const isPositive = percentageChange >= 0;

  return (
    <div className="bg-white p-2 md:p-5 m-1.5 rounded-2xl shadow-sm w-[45%]  md:w-[46%] ">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm text-gray-500">{title}</h4>
          <div className="text-[18px] md:text-2xl font-bold mt-1">{value}</div>
          <div
            className={`text-xs mt-1 font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : "-"}
            {Math.abs(percentageChange)}%{" "}
            {subtext && (
              <span className="text-gray-500 ml-1">{subtext}</span>
            )}
          </div>
        </div>
        <div
          className={`flex items-center text-sm font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-5 h-5" />
          ) : (
            <ArrowDownRight className="w-5 h-5" />
          )}
        </div>
      </div>

      <button className="text-blue-600 text-sm font-medium hover:underline">
        View Report →
      </button>
    </div>
  );
};

export default DashboardCard;
