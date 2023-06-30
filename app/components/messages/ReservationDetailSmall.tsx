'use client';

import { BoookingEvent, Listing, Reservation, User } from "@prisma/client";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { MdInfoOutline } from "react-icons/md";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import BookingListingDetails from "../bookings/BookingListingDetails";
import BookingDetails from "../bookings/BookingDetails";
import BookingTimeline from "../bookings/BookingTimeline";
import { differenceInHours } from "date-fns";
import BookingActions from "../bookings/BookingActions";

interface ReservationDetailSmallProps {
  reservation: Reservation & { user?: User, listing?: Listing, events: BoookingEvent[] };
  currentUser: User;

}
const ReservationDetailSmall: React.FC<ReservationDetailSmallProps> = ({ reservation, currentUser }) => {
  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);
  const bookedNights = Math.ceil(differenceInHours(end, start) / 24);

  return (
    <div className="text-xs p-2 border rounded-xl my-2 shadow-md bg-white">Booking for&nbsp;
      {reservation.listing?.title} <br />
      Check-in:&nbsp;{reservation.startDate.toLocaleDateString('fi')}<br />
      Check-out:&nbsp;{reservation.endDate.toLocaleDateString('fi')}<br />
      Price:&nbsp;{reservation.totalPrice}€<br />
      Status:&nbsp;{reservation.status} <br />
      {reservation.totalPrice>0 && <Sheet>
        <SheetTrigger>
          <Button
            size={'sm'}
            variant={'outline'}
          >
            <MdInfoOutline size={20} color="gray" />Show details
          </Button></SheetTrigger>
        <SheetContent className="md:w-[50vw] w-full">
          <SheetHeader>
            <SheetTitle>Booking details</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full">
            <BookingListingDetails booking={reservation} />
            <BookingDetails booking={reservation} bookedNights={bookedNights} />
            <BookingTimeline booking={reservation} currentUser={currentUser} />
            <BookingActions booking={reservation} currentUser={currentUser} showMessage={false}
            />
            <SheetClose className='mb-4'>
              <Button variant={'outline'} size={'lg'}> Close
              </Button>
            </SheetClose>
          </ScrollArea>
        </SheetContent>
      </Sheet>}
      
    </div>
  )
}

export default ReservationDetailSmall;