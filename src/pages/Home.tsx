import BarChart from "@/ChartGraphs/Revenue"
import DashboardCard from "@/ChartGraphs/One"
const Home = () => {
  return (
    <div className="flex items-start">
      Home
      <DashboardCard/>
      <BarChart/>
      </div>
  )
}

export default Home