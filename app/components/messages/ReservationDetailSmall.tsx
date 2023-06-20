'use client';

import useIsGuest from "@/app/hooks/useIsGuest";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ReservationDetailSmallProps {
  reservation: Reservation & {
    user?: User;
    listing?: Listing;
  }
}
const ReservationDetailSmall: React.FC<ReservationDetailSmallProps> = ({ reservation }) => {
  const { isGuest } = useIsGuest();
  const router = useRouter();
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