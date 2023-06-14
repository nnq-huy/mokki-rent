'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { differenceInDays, format } from 'date-fns';

import useProvinces from "@/app/hooks/useProvinces";

import Button from "../Button";
import { Listing, Reservation, ReservationStatus, User } from "@prisma/client";
import { AiFillMessage, AiOutlineDelete } from "react-icons/ai";
import Avatar from "../Avatar";
import { BsCheckCircleFill, BsHouseCheckFill } from "react-icons/bs";
import useIsGuest from "@/app/hooks/useIsGuest";
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import { MdCancel } from "react-icons/md";

interface ReservationCardProps {

  reservation: Reservation & { user?: User, listing?: Listing };
  onDelete?: (id: string) => void;
  onConfirm?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  showMessage?: Boolean;
};

const ReservationCard: React.FC<ReservationCardProps> = ({
  showMessage,
  reservation,
  onDelete,
  onConfirm,
  disabled,
  actionLabel,
  actionId = '',
}) => {
  const router = useRouter();
  const { getByValue } = useProvinces();
  const guest = reservation.user;
  const IsGuest = useIsGuest();
  const messageModal = useMessageModal();
  const { setCurrentReservation } = useCurrentReservation();


  const location = getByValue(reservation.listing!.locationValue);


  const handleOpenMessage = () => {
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
  const checkoutDate = `${format(end, 'PP')}`;
  const bookedDays = differenceInDays(end, start);

  return (
    <div
      className="col-span-1 bg-white"
    >
      <div className="flex flex-col gap-1 w-full shadow-lg p-4 rounded-xl">
        <div
          onClick={() => router.push(`/properties/${reservation.listing!.id}`)}
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
            src={reservation.listing!.imageSrc}
            alt="Listing"
          />
        </div>
        <div className="font-semibold text-lg">
          {reservation.listing?.title}
        </div>
        <div className="text-neutral-500">
          {location?.label}
        </div>
        <div className="font-light text-neutral-500 text-sm">
          Check-in: {checkinDate} <br />
          Check-out: {checkoutDate}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            Total: {reservation.totalPrice}€, {bookedDays} {bookedDays > 1 ? 'nights' : 'night'}
          </div>
        </div>
        <div className="flex items-center">
          <p className="truncate pr-1 text-xs text-neutral-500">
            Booked by
            <br />
            {guest?.name}</p>
          <Avatar src={guest?.image} />
        </div>
        <div className="font-bold">
          {reservation?.status.toUpperCase()}
        </div>
        {(reservation?.status === ReservationStatus.unconfirmed) && <Button
          icon={BsHouseCheckFill}
          disabled={disabled}
          small
          label="Confirm booking"
          onClick={handleConfirm}
        />}
        {(reservation?.status === ReservationStatus.confirmed) && <Button
          icon={BsCheckCircleFill}
          disabled={disabled}
          small
          label="Mark as done"
          onClick={handleConfirm}
        />}
        {showMessage && <Button
          icon={AiFillMessage}
          disabled={disabled}
          small
          label="Message guest"
          onClick={handleOpenMessage}
        />}
        {onDelete && actionLabel && (
          <Button
            icon={MdCancel}
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleDelete}
          />
        )}
        {(reservation?.status === ReservationStatus.cancelled) && <Button
          icon={AiOutlineDelete}
          disabled={disabled}
          small
          label="Delete reservation"
          onClick={handleDelete}
        />}
      </div>
    </div>
  );
}

export default ReservationCard;
//todo: implement delete & mark as done actions