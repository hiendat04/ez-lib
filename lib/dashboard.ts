import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getDashboardStats(id: string | undefined) {
  try {
    const totalBooks = await prisma.book.count();
    const activeMembers = await prisma.user.count({
      where: { role: { name: "USER" } },
    });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const loansThisMonth = await prisma.loan.count({
      where: { checkOutDate: { gte: startOfMonth }, id: id ? id : undefined },
    });

    const overdueBooks = await prisma.loan.count({
      where: {
        status: "BORROWED",
        dueDate: {
          lt: new Date(),
        },
      },
    });

    // 2. Get data for category distribution chart
    const categoryCounts = await prisma.book.groupBy({
      by: ["category"],
      _count: {
        id: true,
      },
      where: {
        category: {
          not: null,
        },
      },
    });

    const categoryColors = [
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF8042",
      "#AF19FF",
    ];
    const categoryDistribution = categoryCounts.map((cat, index) => ({
      name: cat.category!,
      value: cat._count.id,
      color: categoryColors[index % categoryColors.length],
    }));

    // 3. Get data for borrowing trends chart (last 6 months)
    const borrowingTrends = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - i);
      d.setHours(0, 0, 0, 0);

      const start = d;
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
      end.setHours(23, 59, 59, 999);

      const count = await prisma.loan.count({
        where: {
          checkOutDate: {
            gte: start,
            lte: end,
          },
        },
      });

      borrowingTrends.push({
        month: start.toLocaleString("default", { month: "short" }),
        borrowed: count,
      });
    }

    return {
      success: true,
      stats: {
        totalBooks,
        loansThisMonth,
        overdueBooks,
        activeMembers,
      },
      categoryDistribution,
      borrowingTrends,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { success: false, message: "Failed to fetch dashboard data." };
  }
}
