'use client';

import { Listing, Reservation, User } from "@prisma/client";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { BiCart, BiEuro, BiStar } from "react-icons/bi";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import RecentBookings from "@/app/components/properties/RecentBookings";
import DashboardCard from "@/app/components/DashBoardCard";

interface ReportsPageProps {
  reservations: (Reservation & {
    user: User,
    listing: Listing
  })[],
  mokkiName?: string,
}

const ReportsClient: React.FC<ReportsPageProps> = ({ reservations, mokkiName }) => {
  const doneBookings = reservations.filter((a) => { return (a.status === "done" || a.status === "reviewed") });
  const lastMonthBookings = doneBookings.filter((a) => {
    const bookingMonth = a.endDate.getMonth();
    const currentMonth = new Date().getMonth();
    return bookingMonth === (currentMonth - 1)
  });
  const lastMonthRevenue = lastMonthBookings.reduce((a, b) => {
    return a + b.totalPrice;
  }, 0);
  const reviewedBookings = reservations.filter((a) => { return a.status === "reviewed" });
  const recentBookings = doneBookings.slice(0, 5);
  const totalRevenue = doneBookings.reduce((a, b) => {
    return a + b.totalPrice;
  }, 0);
  const totalBookings = doneBookings.length;
  const averageRating = (
    reviewedBookings.reduce((a, b) => {
      return a + b.rating;
    }, 0) / reviewedBookings.length
  );
  const averageRevenuePerBooking = totalRevenue / totalBookings;

  const barChart = (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={doneBookings}>
            <XAxis />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `€${value}`} />
            <Tooltip />
            <Bar dataKey="totalPrice" fill='#028446' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);

  return (
    <div className="max-w-screen-xl w-[80vw] px-2 md:px-4 xl:px-8">
      <h1 className="text-3xl font-semibold"> Reports</h1>
      <p className="text-gray-500">{mokkiName ? `Your operating stats for ${mokkiName}` : 'Stats for all properties'}</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4 w-full">
        <DashboardCard title="Total revenue" subtext=" down 10 % from last year" amount={totalRevenue.toString() + '€'} icon={BiEuro} />
        <DashboardCard title="Last month revenue" subtext="up 10 % from previous month" amount={lastMonthRevenue.toFixed(2) + '€'} icon={BiEuro} />
        <DashboardCard title="Total bookings" subtext="up 10 % from previous month" amount={totalBookings.toString()} icon={BiCart} />
        <DashboardCard title="Last month bookings" subtext="up 10 % from previous month" amount={lastMonthBookings.length.toString()} icon={BiCart} />
        <DashboardCard title="Average booking value" subtext="up 15 % from previous month" amount={averageRevenuePerBooking.toFixed(2)} icon={BiCart} />
        <DashboardCard title="Rating" subtext={reviewedBookings.length.toString() + ' reviews'} amount={averageRating.toFixed(1) + ' / 5'} icon={BiStar} />
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {barChart}
        <RecentBookings reservations={recentBookings} name={'all mokki'} />
      </div>
    </div>)
}

export default ReportsClient;
//TODO calculate revenue based on done bookings, groups by month, move calculations to server side