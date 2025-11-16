import { getSession } from "@/lib/auth";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CategoryDistributionChart from "@/components/dashboard/CategoryDistributionChart";
import StatCard from "@/components/books/StatCard";
import Card from "@/components/Card";
import BorrowingTrendsChart from "@/components/dashboard/BorrowingTrendsChartProps";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await getSession();
  const { fullName, id } = session || {};

  // Fetch real data from the database
  const dashboardData = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/books/stats/${id}`,
  )
    .then((res) => res.json())
    .then((data) => data);

  console.log("Dashboard Data:", dashboardData);

  if (!dashboardData.success) {
    return (
      <div className="p-8 text-center text-red-500">
        <h1 className="text-2xl">Failed to load dashboard data.</h1>
        <p>{dashboardData.message}</p>
      </div>
    );
  }

  const { stats, categoryDistribution, borrowingTrends } = dashboardData;

  const statCards = [
    {
      title: "Total Books",
      number: stats.totalBooks,
      color: "text-blue-500",
      Icon: MenuBookOutlinedIcon,
    },
    {
      title: "Loans This Month",
      number: stats.loansThisMonth,
      color: "text-green-500",
      Icon: TrendingUpOutlinedIcon,
    },
    {
      title: "Overdue Books",
      number: stats.overdueBooks,
      color: "text-orange-500",
      Icon: HistoryOutlinedIcon,
    },
    {
      title: "Active Members",
      number: stats.activeMembers,
      color: "text-purple-500",
      Icon: PeopleAltOutlinedIcon,
    },
  ];

  return (
    <div className="p-8">
      <h1 className="mb-1 text-3xl font-medium">Welcome back, {fullName}</h1>
      <p className="mb-8 text-gray-500">
        Here&apos;s what happening with your library today!
      </p>

      {/* Stat Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard
            key={stat.title}
            color={stat.color}
            title={stat.title}
            number={stat.number}
            Icon={stat.Icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Borrowing Trends
          </h3>
          <BorrowingTrendsChart data={borrowingTrends} />
        </Card>
        <Card className="lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Books by Category
          </h3>
          <CategoryDistributionChart data={categoryDistribution} />
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card className="rounded-lg p-6 shadow-sm">
          <h3 className="mb-4 text-[#212529] font-medium">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard/books"
              className="rounded-md bg-primary p-2 text-white"
            >
              Browse Books
            </Link>
            <Link
              href="/dashboard/loans"
              className="rounded-md bg-secondary text-white p-2"
            >
              View My Loans
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
