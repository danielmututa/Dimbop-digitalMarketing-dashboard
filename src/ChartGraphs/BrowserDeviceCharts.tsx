import DevicePieChart from './DevicepieChart';
import BrowserStatsChart from './BrowesrStatusChart';

const AnalyticsDashboard = () => {
  const deviceStats = {
    mobile: 45,
    tablet: 10,
    desktop: 40,
    other: 3,
    unknown: 2,
  };

  const browserStats = [
    { browser: 'Chrome', percentage: 65, usage: 1200, time: '13:16' },
    { browser: 'Firefox', percentage: 15, usage: 300, time: '13:16' },
    { browser: 'Safari', percentage: 10, usage: 200, time: '13:16' },
    { browser: 'Edge', percentage: 5, usage: 100, time: '13:16' },
    { browser: 'Other', percentage: 5, usage: 50, time: '13:16' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 min-h-screen">
      <div className="w-full md:w-1/2">
        <DevicePieChart stats={deviceStats} />
      </div>
      <div className="w-full md:w-1/2">
        <BrowserStatsChart stats={browserStats} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
