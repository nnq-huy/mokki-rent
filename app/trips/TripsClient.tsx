'use client';

import Heading from "@/app/components/Heading";
import { Reservation, User } from "@prisma/client";
import TripCardNew from "../components/trips/TripCardNew";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface TripsClientProps {
  reservations: Reservation[],
  currentUser: User,
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  const [showCancelled, setShowCancelled] = useState(false);

  const filteredReservations = reservations.filter((rerservation) => {
    if (!showCancelled) { return rerservation.status != 'cancelled'; }
    else return rerservation.status
  });
  return (
    <div className="xl:px-8 md:px-4 px-2 pt-4" >
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="flex flex-row justify-start gap-4 px-4 w-full">
        <Button
          variant={'outline'}
          className="gap-2 text-mokki-green"
          onClick={() => setShowCancelled(!showCancelled)}
        >
          {showCancelled ? 'Cancelled is shown' : 'Cancelled is hidden'}
          {showCancelled ? <AiFillEye /> : <AiFillEyeInvisible />}
        </Button>
      </div>
      <div className="flex flex-col gap-16 items-center pt-4">
        {filteredReservations.map((reservation: any) => (
          <TripCardNew
            key={reservation.id}
            reservation={reservation}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}

export default TripsClient;