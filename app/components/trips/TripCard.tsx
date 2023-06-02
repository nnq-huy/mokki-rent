'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { differenceInDays, format } from 'date-fns';

import useProvinces from "@/app/hooks/useProvinces";

import Button from "../Button";
import { Listing, Reservation, User } from "@prisma/client";
import { AiOutlineDelete, AiOutlineMessage } from "react-icons/ai";
import HeartButton from "../HeartButton";
import Avatar from "../Avatar";
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import useIsGuest from "@/app/hooks/useIsGuest";

interface TripCardProps {
  listing: Listing;
  reservation: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null
};

const TripCard: React.FC<TripCardProps> = ({
  listing,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const messageModal = useMessageModal();
  const IsGuest = useIsGuest();
  const {setCurrentReservation} = useCurrentReservation();

  const { getByValue } = useProvinces();

  const location = getByValue(listing.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const handleOpenMessage = ()=>{
    IsGuest.switchToGuest();
    setCurrentReservation(reservation);
    messageModal.onOpen();
  }

  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);
  const checkinDate = `${format(start, 'PP')}`;
  const checkoutDate=`${format(end, 'PP')}`;
  const bookedDays = differenceInDays(end,start);

  return (
    <div 
      className="col-span-1 "
    >
      <div className="flex flex-col gap-2 w-full shadow-lg p-4 rounded-xl">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden
            rounded-xl
          "
        >
          <Image
          onClick={() => router.push(`/listings/${listing.id}`)}
            fill
            className="
              cursor-pointer group
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={listing.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              listingId={listing.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          Check-in: {checkinDate} <br/>
          Check-out: {checkoutDate}
        </div>
        <div className="font-semibold">
          Total: {reservation.totalPrice}€, {bookedDays} {bookedDays>1?'nights':'night'}
        </div>
        <div className="flex items-center">
            <p className="truncate pr-1">Hosted by {reservation.hostName}</p>
            <Avatar src={reservation.hostPhoto} />
        </div>
        <div className="font-bold">
        {reservation.confirmed?'Booking confirmed':'Confirmation pending...'}
        </div>
        <Button
          icon={AiOutlineMessage}
          disabled={disabled}
          small
          label="Contact host" 
          onClick={handleOpenMessage}
        />
        {onAction && actionLabel && (
          <Button
            icon={AiOutlineDelete}
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
   );
}
 
export default TripCard;