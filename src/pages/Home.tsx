import AnalyticsDashboard from "@/ChartGraphs/BrowserDeviceCharts"
import BarChart from "@/ChartGraphs/Revenue"
import Dashboard from "@/ChartGraphs/Two"
const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-5 pt-5 justify-between items-start">
      
   
        
      <Dashboard/>
    
    <AnalyticsDashboard/>

      <BarChart/>
      </div>
  )
}

export default Home


