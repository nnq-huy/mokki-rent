'use client';

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { differenceInHours, format } from 'date-fns';

import useProvinces from "@/app/hooks/useProvinces";
import { statuses } from "@/app/constants"


import Button from "../Button";
import { Listing, Reservation, ReservationStatus, User } from "@prisma/client";
import MyAvatar from "../MyAvatar";
import useIsGuest from "@/app/hooks/useIsGuest";
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import { CalendarCheck, CheckCircle, MessageCircle, Trash2, XCircle } from "lucide-react";
import { BiDetail } from "react-icons/bi";
import { Separator } from "../ui/separator";

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

const ReservationCardNew: React.FC<ReservationCardProps> = ({
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
  const status = statuses.find((status) => status.value === reservation.status);

  return (
    <div className="bg-white flex flex-row gap-4 max-w-screen-sm w-[85vw] shadow-lg p-0 rounded-xl">
      <div className="p-4 basis-1/2 md:basis-2/3 flex flex-col gap-2">
        <div>
          <h1 className="font-semibold text-lg">
            {reservation.listing?.title}
          </h1>
          <p className="text-neutral-500 text-sm">
            {location?.label}
          </p>
        </div>
        <Separator />
        <div className="font-light text-neutral-500 text-sm">
          Check-in: {checkinDate} <br />
          Check-out: {checkoutDate}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            {bookedNights} {bookedNights > 1 ? 'nights' : 'night'}, {reservation.totalPrice}€
          </div>
        </div>
        <div className="flex items-center">
          <p className="truncate pr-1 text-xs text-neutral-500">
            Booked by
            <br />
            {guest?.name}</p>
          <MyAvatar src={guest?.image!} />
        </div>
        <div className="bg-gray-50 font-bold flex items-center justify-center gap-1 border p-1 rounded-xl">
          {status && (
            <status.icon className=" h-4 w-4 text-muted-foreground" />
          )}{status?.label.toUpperCase()}
        </div>
      </div>

      <div className="basis-1/2 md:basis-1/3 items-center flex flex-col gap-1 justify-center p-2 border-l">
        <Button
          icon={BiDetail}
          disabled={disabled}
          small
          label={"View details"}
          onClick={() => { router.push(`/dashboard/bookings/${reservation.id}`) }}
        />
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

export default ReservationCardNew;
