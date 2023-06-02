'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { differenceInDays, format } from 'date-fns';

import useProvinces from "@/app/hooks/useProvinces";

import Button from "../Button";
import { Listing, Reservation, User } from "@prisma/client";
import { AiOutlineDelete, AiOutlineMessage } from "react-icons/ai";
import Avatar from "../Avatar";
import { BsHouseCheckFill } from "react-icons/bs";
import useIsGuest from "@/app/hooks/useIsGuest";
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";

interface ReservationCardProps {
  data: Listing;
  reservation: Reservation & {user: User};
  onDelete?: (id: string) => void;
  onConfirm?:(id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null
};

const ReservationCard: React.FC<ReservationCardProps> = ({
  data,
  reservation,
  onDelete,
  onConfirm,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useProvinces();
  const guest = reservation.user;
  const IsGuest = useIsGuest();
  const messageModal = useMessageModal();
  const {setCurrentReservation} = useCurrentReservation();


  const location = getByValue(data.locationValue);


  const handleOpenMessage = ()=>{
    IsGuest.switchToHost();
    setCurrentReservation(reservation);
    messageModal.onOpen();
  }
  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onDelete?.(actionId)
  }, [disabled, onDelete, actionId]);

  const handleConfirm = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onConfirm?.(actionId)
  }, [disabled, onConfirm, actionId]);



  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);
  const checkinDate = `${format(start, 'PP')}`;
  const checkoutDate=`${format(end, 'PP')}`;
  const bookedDays = differenceInDays(end,start);

  return (
    <div 
      className="col-span-1"
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          onClick={() => router.push(`/listings/${data.id}`)}
          className="
            cursor-pointer group
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
        </div>
        <div className="font-semibold text-lg">
          {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          Check-in: {checkinDate} <br/>
          Check-out: {checkoutDate}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            Total: {reservation.totalPrice}€, {bookedDays} {bookedDays>1?'nights':'night'}
          </div>
        </div>
        <div className="flex items-center">
            <p className="truncate pr-1">Booked by {guest?.name}</p>
            <Avatar src={guest?.image} />
        </div>
        <div className="font-bold">
          {reservation?.confirmed?'Booking confirmed':'Confirmation pending...'}
        </div>
          {!reservation?.confirmed && <Button
            icon={BsHouseCheckFill}
            disabled={disabled}
            small
            label="Confirm booking" 
            onClick={handleConfirm}
          />}
          <Button
            icon={AiOutlineMessage}
            disabled={disabled}
            small
            label="Message guest" 
            onClick={handleOpenMessage}
          />
        {onDelete && actionLabel && (
          <Button
            icon={AiOutlineDelete}
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleDelete}
          />
        )}
      </div>
    </div>
   );
}
 
export default ReservationCard;