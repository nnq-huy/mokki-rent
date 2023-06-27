'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { differenceInDays, differenceInHours, format } from 'date-fns';

import useProvinces from "@/app/hooks/useProvinces";

import Button from "../Button";
import { Listing, Reservation, ReservationStatus, User } from "@prisma/client";
import { AiOutlineMessage } from "react-icons/ai";
import HeartButton from "../HeartButton";
import MyAvatar from "../MyAvatar";
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import useIsGuest from "@/app/hooks/useIsGuest";
import { MdCancel, MdOutlineMeetingRoom, MdOutlinePlace, MdReviews } from "react-icons/md";
import { BsPersonFill, BsStar } from "react-icons/bs";
import { XCircle } from "lucide-react";
import { statuses } from "@/app/constants";

interface TripCardProps {
  reservation: Reservation & { user?: User, listing?: Listing };
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
  showMessage?: Boolean;
};

const TripCard: React.FC<TripCardProps> = ({
  showMessage,
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
  const { setCurrentReservation } = useCurrentReservation();

  const { getByValue } = useProvinces();

  const location = getByValue(reservation.listing!.locationValue);
  const isCancellable = (reservation.status == ReservationStatus.unconfirmed || reservation.status == ReservationStatus.confirmed)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId)
    }, [disabled, onAction, actionId]);

  const handleOpenMessage = () => {
    IsGuest.switchToGuest();
    setCurrentReservation(reservation);
    messageModal.onOpen();
  }

  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);
  const checkinDate = `${format(start, 'PP')}`;
  const checkoutDate = `${format(end, 'PP')}`;
  const bookedNights = Math.ceil(differenceInHours(end, start) / 24);
  const status = statuses.find((status) => status.value === reservation.status);

  return (
    <div
      className="col-span-1 bg-white flex flex-col gap-2 w-full shadow-lg rounded-xl"
    >
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden
            rounded-t-xl
          "
        >
          <Image
            onClick={() => router.push(`/listings/${reservation.listing!.id}`)}
            fill
            className="
              cursor-pointer group
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={reservation.listing!.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton
              listingId={reservation.listing!.id}
              currentUser={currentUser}
            />
          </div>
        </div>
              <div className="px-4 pb-4">

        <div className="font-semibold text-lg flex flex-row justify-between">
          <div>{reservation.listing?.title}</div>
          <div className="flex flex-row gap-1 items-center text-sm text-neutral-500">
            {<BsStar />}
            {reservation.listing!.rating > 1 ? reservation.listing!.rating.toFixed(1) : ''}
          </div>
        </div>
        <div className="flex flex-row items-center  justify-between gap-1 text-neutral-500">
          <div className="flex items-center gap-1"><MdOutlinePlace />{location?.label} </div>
          <div className="flex items-center gap-1">
            {<MdOutlineMeetingRoom />}
            {reservation.listing!.roomCount}
            {<BsPersonFill />}
            {reservation.listing!.guestCount}
          </div>
        </div>
        <div className="font-light text-neutral-500 text-sm">
          Check-in: {checkinDate} <br />
          Check-out: {checkoutDate}
        </div>
        <div className="font-semibold">
          Total: {reservation.totalPrice}€, {bookedNights} {bookedNights > 1 ? 'nights' : 'night'}
        </div>
        <div className="flex min-w-full items-center">
          <p className="truncate pr-1 text-xs text-neutral-500">
            Hosted by
            <br />
            {reservation.hostName}
          </p>
          <MyAvatar src={reservation.hostPhoto!} />
        </div>
        <div className="font-bold flex items-center gap-1">
          {status && (
            <status.icon className=" h-4 w-4 text-muted-foreground" />
          )}{status?.label.toUpperCase()}
        </div>
        {showMessage && <Button
          icon={AiOutlineMessage}
          disabled={disabled}
          small
          label="Contact host"
          onClick={handleOpenMessage}
        />}
        {reservation.status === 'done' &&
          <Button
            icon={MdReviews}
            disabled={disabled}
            small
            label="Leave review"
            onClick={handleOpenMessage}
          />
        }
        {onAction && actionLabel && isCancellable && (
          <Button
            icon={XCircle}
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