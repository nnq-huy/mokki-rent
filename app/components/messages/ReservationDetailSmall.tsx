'use client';

import { Listing, Reservation, User } from "@prisma/client";

interface ReservationDetailSmallProps {
  reservation: Reservation & {
    user?: User;
    listing?: Listing;
  }
}
const ReservationDetailSmall: React.FC<ReservationDetailSmallProps> = ({ reservation }) => {
  return (
    <div className="text-xs p-2 border rounded-xl my-2 shadow-md bg-white">Booking for&nbsp;
    {reservation.listing?.title} <br/>
    Check-in:&nbsp;{reservation.startDate.toLocaleDateString('fi')}<br/>
    Check-out:&nbsp;{reservation.endDate.toLocaleDateString('fi')}<br/>
    Price:&nbsp;{reservation.totalPrice}€<br/>
    Status:&nbsp;{reservation.status}
    </div>
  )
}

export default ReservationDetailSmall;