import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Pie } from 'react-chartjs-2';
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  type DeviceStats = {
    mobile: number;
    tablet: number;
    desktop: number;
    other: number;
    unknown: number;
  };
  
  const DevicePieChart = ({ stats }: { stats: DeviceStats }) => {
    const data = {
      labels: ['Mobile', 'Tablet', 'Desktop', 'Other', 'Unknown'],
      datasets: [
        {
          data: [
            stats.mobile,
            stats.tablet,
            stats.desktop,
            stats.other,
            stats.unknown,
          ],
          backgroundColor: ['#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF6384'],
        },
      ],
    };
  
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Device Distribution</h2>
        <Pie data={data} />
      </div>
    );
  };
  
  export default DevicePieChart;
  