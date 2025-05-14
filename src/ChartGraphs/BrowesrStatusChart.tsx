import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BrowserStat = {
  browser: string;
  percentage: number;
  usage: number;
  time: string;
};

const BrowserStatsChart = ({ stats }: { stats: BrowserStat[] }) => {
  const data = {
    labels: stats.map((s) => `${s.browser} (${s.time})`),
    datasets: [
      {
        label: '% Usage',
        data: stats.map((s) => s.percentage),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const stat = stats[context.dataIndex];
            return `Browser: ${stat.browser}, Usage: ${stat.usage}, Time: ${stat.time}, Percentage: ${stat.percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div className=" bg-white p-4 mt-4 rounded-xl shadow-sm ">
      <h2 className="text-lg font-semibold mb-4">Browser Usage</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BrowserStatsChart;
