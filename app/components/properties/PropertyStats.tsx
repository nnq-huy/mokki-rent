'use client';

import { Listing, Reservation, User } from "@prisma/client";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import DashboardCard from "../DashBoardCard";
import RecentBookings from "./RecentBookings";
import { BiCart, BiEuro, BiStar } from "react-icons/bi";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface PropertyStatsProps {
  reservations: (Reservation & {
    user: User,
    listing: Listing
  })[],
  name: string,
}

const PropertyStats: React.FC<PropertyStatsProps> = ({ reservations, name }) => {
  const doneBookings = reservations.filter((a) => { return a.status === "done" })
  const recentBookings = reservations.slice(0, 5);
  const totalRevenue = reservations.reduce((a, b) => {
    return a + b.totalPrice;
  }, 0);
  const totalBookings = reservations.length.toString();

  const barChart = (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={reservations}>
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
    <div className="max-w-screen-xl w-[80vw]">
      <h1 className="text-3xl font-semibold"> Stats for {name}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4 w-full">
        <DashboardCard title="Total revenue" subtext=" down 10 % from last year" amount={totalRevenue.toString() + '€'} icon={BiEuro} />
        <DashboardCard title="Last month revenue" subtext="up 10 % from previous month" amount="0€" icon={BiEuro} />
        <DashboardCard title="Total bookings" subtext="up 10 % from previous month" amount={totalBookings} icon={BiCart} />
        <DashboardCard title="Last month bookings" subtext="up 10 % from previous month" amount="0" icon={BiCart} />
        <DashboardCard title="Rating" subtext="down 100 % from previous month" amount="4.4/5" icon={BiStar} />
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {barChart}
        <RecentBookings reservations={recentBookings} name={name} />
      </div>
    </div>)
}

export default PropertyStats;
//TODO calculate revenue based on done bookings, groups by month