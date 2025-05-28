
// import Dashboard from "@/ChartGraphs/Two"
import Dashboard from "@/context/All-Graphs"
const Home = () => {
  return (
    <div className=" flex flex-col">
    <div className="flex flex-col xl:flex-row lg:gap-5 pt-5 justify-between items-start">
      

      <div className="">
        <Dashboard/>
      </div>
      </div>
      </div>
  )
}

export default Home


