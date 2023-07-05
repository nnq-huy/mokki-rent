import { Listing, Reservation, User } from "@prisma/client";

interface IUseBookingStats {
  reservations: (Reservation & {
    user: User,
    listing: Listing
  })[];
}

const useBookingStats = ({reservations }: IUseBookingStats) => {
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
  const totalRatings = reviewedBookings.length;

  return {
    doneBookings,
    lastMonthBookings,
    lastMonthRevenue,
    totalBookings,
    totalRevenue,
    averageRevenuePerBooking,
    averageRating,
    totalRatings,
    recentBookings
  }
}

export default useBookingStats;
