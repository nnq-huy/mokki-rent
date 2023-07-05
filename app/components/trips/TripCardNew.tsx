'use client';
import { useState } from "react";
import { BoookingEvent, Listing, Reservation, ReservationStatus, User } from "@prisma/client";

import { useRouter } from "next/navigation";
import { differenceInHours, format } from 'date-fns';
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import useIsGuest from "@/app/hooks/useIsGuest";

import Image from "next/image";
import { MdInfoOutline, MdOutlineMessage, MdOutlinePlace, MdOutlineRateReview } from "react-icons/md";
import { BsStar } from "react-icons/bs";
import { statuses } from "@/app/constants";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import BookingTimeline from "../bookings/BookingTimeline";
import BookingListingDetails from "../bookings/BookingListingDetails";
import BookingDetails from "../bookings/BookingDetails";
import BookingActions from "../bookings/BookingActions";

interface TripCardProps {
  reservation: Reservation & { user: User, listing: Listing, events: BoookingEvent[] };
  currentUser: User;
};

const TripCardNew: React.FC<TripCardProps> = ({
  reservation,
  currentUser,
}) => {
  const router = useRouter();
  const messageModal = useMessageModal();
  const IsGuest = useIsGuest();
  const { setCurrentReservation } = useCurrentReservation();

  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);
  const checkinDate = `${format(start, 'PP')}`;
  const checkoutDate = `${format(end, 'PP')}`;

  const bookedNights = Math.ceil(differenceInHours(end, start) / 24);
  const status = statuses.find((status) => status.value === reservation.status);

  const handleOpenMessage = () => {
    IsGuest.switchToGuest();
    setCurrentReservation(reservation);
    messageModal.onOpen();
  }

  return (
    <div className="col-span-2 bg-white flex flex-row gap-2 w-full shadow-lg rounded-xl max-w-screen-lg">
      <div className="md:basis-1/3 basis-1/2 p-4 col-span-1">
        <div className="font-semibold text-lg flex flex-row justify-between">
          <div>{reservation.listing?.title}</div>
          <div className="flex flex-row gap-1 items-center text-sm text-gray-500">
            {<BsStar />}
            {reservation.listing!.rating > 1 ? reservation.listing!.rating.toFixed(1) : ''}
          </div>
        </div>
        <div className="flex flex-row items-center  justify-between gap-1 text-gray-500">
          <div className="flex items-center gap-1 text-sm"><MdOutlinePlace />{reservation.listing.locationValue} </div>
        </div>
        <Separator />
        <div className="text-gray-500 text-sm py-2">
          {checkinDate}	&nbsp;-	&nbsp;{checkoutDate}
        </div>
        <div className="font-semibold ">
          {bookedNights} {bookedNights > 1 ? 'nights' : 'night'} | {reservation.totalPrice}€
        </div>
        <div className="flex flex-row items-start">
          <Sheet>
            <SheetTrigger>
              <Button
                size={'icon'}
                variant={'ghost'}
              >
                <MdInfoOutline size={20} color="gray" />
              </Button></SheetTrigger>
            <SheetContent className="md:w-[50vw] w-full">
              <SheetHeader>
                <SheetTitle>Booking details</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-full">
                <BookingListingDetails booking={reservation} />
                <BookingDetails booking={reservation} bookedNights={bookedNights} />
                <BookingTimeline booking={reservation} />
                <BookingActions booking={reservation} showMessage currentUserId={currentUser.id} />
                <SheetClose className='mb-4'>
                  <Button variant={'outline'} size={'lg'}> Close
                  </Button>
                </SheetClose>
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <Button
            size={'icon'}
            variant={'ghost'}
            onClick={handleOpenMessage}
          >
            <MdOutlineMessage size={20} color="gray" />
          </Button>
        </div>
      </div>
      <div
        className="
            aspect-[square] 
            w-full 
            relative 
            overflow-hidden
            rounded-r-xl
            md:basis-2/3
            basis-1/2
          "
      >
        <Image
          onClick={() => router.push(`/listings/${reservation.listingId}`)}
          fill
          className="
              cursor-pointer
              object-cover
              hover:scale-110
              transition
            "
          src={reservation.listing!.imageSrc}
          alt="Listing"
        />
        <div className="
            absolute
            top-3
            left-3
          ">
          <div className="font-bold bg-black/70 rounded text-gray-100 flex items-center gap-1">
            {status && (
              <status.icon className=" h-4 w-4" />
            )}{status?.label.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripCardNew;