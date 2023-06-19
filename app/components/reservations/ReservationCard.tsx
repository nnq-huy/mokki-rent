'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { differenceInDays, differenceInHours, format } from 'date-fns';

import useProvinces from "@/app/hooks/useProvinces";

import Button from "../Button";
import { Listing, Reservation, ReservationStatus, User } from "@prisma/client";
import Avatar from "../Avatar";
import useIsGuest from "@/app/hooks/useIsGuest";
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import { CalendarCheck, CheckCircle, MessageCircle, Trash2, XCircle } from "lucide-react";

interface ReservationCardProps {

  reservation: Reservation & { user?: User, listing?: Listing };
  onDelete?: (id: string) => void;
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
  onMarkDone?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  showMessage?: Boolean;
};

const ReservationCard: React.FC<ReservationCardProps> = ({
  showMessage,
  reservation,
  onCancel,
  onDelete,
  onConfirm,
  onMarkDone,
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
  const today = new Date();
  const canMarkDone = reservation.endDate < today;

  const location = getByValue(reservation.listing!.locationValue);


  const handleOpenMessage = () => {
    IsGuest.switchToHost();
    setCurrentReservation(reservation);
    messageModal.onOpen();
  }
  const handleMarkDone = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onMarkDone?.(actionId)
    }, [disabled, onMarkDone, actionId]);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onCancel?.(actionId)
    }, [disabled, onCancel, actionId]);

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
  const bookedNights = Math.ceil(differenceInHours(end, start) / 24);

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
            Total: {reservation.totalPrice}€, {bookedNights} {bookedNights > 1 ? 'nights' : 'night'}
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
          icon={CalendarCheck}
          disabled={disabled}
          small
          label="Confirm booking"
          onClick={handleConfirm}
        />}
        {(reservation?.status === ReservationStatus.confirmed && canMarkDone) && <Button
          icon={CheckCircle}
          disabled={disabled}
          small
          label="Mark as done"
          onClick={handleMarkDone}
        />}
        {showMessage && <Button
          icon={MessageCircle}
          disabled={disabled}
          small
          label="Message guest"
          onClick={handleOpenMessage}
        />}
        {onCancel && actionLabel && (
          <Button
            icon={XCircle}
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
        {(reservation?.status === ReservationStatus.cancelled) && <Button
          icon={Trash2}
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