import DashboardCard from "./One";

const Dashboard = () => {
  return (
    <div className="flex w-full xl:w-1/2  md:h-full justify-between flex-wrap  ">
      <DashboardCard
        title="Total orders"
        value="12,832"
        percentageChange={20.1}
        subtext="+2,123 today"
      />
      <DashboardCard
        title="Total Sales"
        value="$12,832.80"
        percentageChange={10.6}
        subtext="+1,895 today"
      />
      <DashboardCard
        title="Visits"
        value="1,062"
        percentageChange={-10}
        subtext="-426 today"
      />
      <DashboardCard
        title="Conversation rate"
        value="90%"
        percentageChange={12}
        subtext="+42 today"
      />
    </div>
  );
};

export default Dashboard;
