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
      labels: ['Mobile', 'Tablet', 'Desktop', 'Other', 'Unknown'],
    };
  
    return (
      <div className="p-4 rounded-xl shadow-sm  w-[99%]">
        <h2 className="text-lg font-semibold mb-4">Device Distribution</h2>
        <Pie data={data} />
      </div>
    );
  };
  
  export default DevicePieChart;
  