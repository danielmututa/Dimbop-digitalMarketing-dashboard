import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  import { Bar } from 'react-chartjs-2'
  
  // Register components
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  
  // Chart data and options
  const data = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1900, 3000, 2500],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
      },
    },
  }
  
  // const BarChart = () => {
  //   return <Bar data={data} options={options} />
  // }
  

  const BarChart = () => {
    return (
      <div className="hidden md:block bg-white p-5  mt-4  rounded-xl shadow-sm w-[99%] xl:w-1/2">
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
        <Bar data={data} options={options} />
      </div>
    );
  };


  export default BarChart
  