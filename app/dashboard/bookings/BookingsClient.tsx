'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import { BoookingEvent, Listing, Reservation, ReservationStatus, User } from "@prisma/client";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import { Button } from "@/app/components/ui/button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ReservationsTable from "@/app/components/bookings/BookingsTable";
import { BsFillGridFill, BsListUl } from "react-icons/bs";
import ReservationCardNew from "@/app/components/bookings/BookingCardNew";

interface ReservationsClientProps {
  reservations: (Reservation & {
    user: User,
    listing: Listing
    events: BoookingEvent[]
  })[],
  currentUser: User
}

const BookingsClient: React.FC<ReservationsClientProps> = ({
  reservations, currentUser
}) => {
  const [showCancelled, setShowCancelled] = useState(false);
  const [listView, setListView] = useState(true);

  const filteredReservations = reservations.filter((rerservation) => {
    if (!showCancelled) { return rerservation.status != 'cancelled'; }
    else return rerservation.status
  });
  return (
    <div className="min-h-[80vh] w-full">
      <Heading
        title="Bookings"
        subtitle="Reservations on your properties"
      />
      <div className="flex flex-row justify-start gap-4 px-4 w-full">
        <Button
          variant={'outline'}
          className="gap-2 text-mokki-green"
          onClick={() => setShowCancelled(!showCancelled)}
        >
          {showCancelled ? 'Cancelled is shown' : 'Cancelled is hidden'}{showCancelled ? <AiFillEye /> : <AiFillEyeInvisible />}</Button>
        <Button
          variant={'outline'}
          className="gap-2 text-mokki-green"
          onClick={() => setListView(!listView)}
        >
          {listView ? 'List View' : 'Grid View'}
          {listView ? <BsListUl /> : <BsFillGridFill />}</Button>
      </div>
      <div className="px-4 pt-4 text-slate-500">
        Showing {filteredReservations.length} reservations
      </div>
      {listView
        ? <ReservationsTable reservations={filteredReservations} />
        : <div
          className="
          items-center
          flex
          flex-col
          gap-4
          xl:px-8
          md:px-4
          sm:px-2
          px-2
        "
        >
          {filteredReservations.map((reservation) => (
            <ReservationCardNew
              key={reservation.id}
              reservation={reservation}
              showMessage
              currentUserId={currentUser.id}
            />
          ))}
        </div>}

    </div>
  );
}

export default BookingsClient;
